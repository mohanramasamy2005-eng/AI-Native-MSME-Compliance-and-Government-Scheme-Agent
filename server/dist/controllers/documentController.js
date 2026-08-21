import { DocumentModel } from "../models/Document.js";
import { BusinessProfile } from "../models/BusinessProfile.js";
import { Deadline } from "../models/Deadline.js";
import { ActionItem } from "../models/ActionItem.js";
import { searchGovernmentKnowledgeBase } from "../services/ragRetrievalService.js";
import fs from "node:fs/promises";
import path from "node:path";
import { PDFParse } from "pdf-parse";
import { createWorker } from "tesseract.js";
const datePattern = /\b(20\d{2}[-/]\d{2}[-/]\d{2}|\d{2}[-/]\d{2}[-/]20\d{2})\b/g;
const normaliseDate = (value) => {
    const parts = value.split(/[-/]/);
    if (parts[0].length === 4)
        return parts.join("-");
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
};
const field = (label, value, confidence) => ({
    label,
    value,
    confidence,
});
async function extractText(filePath, mimeType) {
    const buffer = await fs.readFile(filePath);
    if (mimeType === "application/pdf") {
        const parser = new PDFParse({ data: buffer });
        try {
            const parsed = await parser.getText();
            return parsed.text.replace(/\s+/g, " ").trim();
        }
        finally {
            await parser.destroy();
        }
    }
    const worker = await createWorker("eng");
    try {
        const result = await worker.recognize(buffer);
        return result.data.text.replace(/\s+/g, " ").trim();
    }
    finally {
        await worker.terminate();
    }
}
function analyseText(text, fileName, profile) {
    const source = text || fileName;
    const lower = source.toLowerCase();
    const dates = [...source.matchAll(datePattern)].map((match) => normaliseDate(match[0]));
    const expiryMatch = source.match(/(?:expiry|valid until|valid upto|expires?)[^\d]*(\d{2}[-/]\d{2}[-/]20\d{2}|20\d{2}[-/]\d{2}[-/]\d{2})/i);
    const expiryDate = expiryMatch ? normaliseDate(expiryMatch[1]) : undefined;
    const extractedFields = [field("Document Name", fileName, 0.99)];
    const patterns = [
        ["GSTIN", /\b\d{2}[A-Z]{5}\d{4}[A-Z]\d[A-Z]\w\b/i],
        ["PAN", /\b[A-Z]{5}\d{4}[A-Z]\b/i],
        ["Udyam Registration", /\bUDYAM[- ]?[A-Z]{2}[- ]?\d{2}[- ]?\d{7}\b/i],
    ];
    for (const [label, pattern] of patterns) {
        const match = source.match(pattern);
        if (match)
            extractedFields.push(field(label, match[0], 0.9));
    }
    if (expiryDate)
        extractedFields.push(field("Expiry Date", expiryDate, 0.86));
    if (dates.length > 0)
        extractedFields.push(field("Detected Dates", dates.join(", "), 0.78));
    if (profile.businessName &&
        lower.includes(profile.businessName.toLowerCase()))
        extractedFields.push(field("Company Name", profile.businessName, 0.88));
    const profileMatches = [];
    const profileMismatches = [];
    const missingInformation = [];
    const compare = (label, value) => {
        if (!value)
            return;
        if (lower.includes(value.toLowerCase()))
            profileMatches.push(`${label} matches the business profile (${value}).`);
        else
            profileMismatches.push(`${label} does not appear to match the business profile (${value}).`);
    };
    compare("Company name", profile.businessName);
    compare("GSTIN", profile.gstin);
    compare("PAN", profile.pan);
    if (!text || text.length < 30)
        missingInformation.push("Readable text could not be reliably extracted; manual review is required.");
    if (!expiryDate)
        missingInformation.push("No clear expiry or validity date was found.");
    if (!patterns.some(([, pattern]) => pattern.test(source)))
        missingInformation.push("No registration identifier was found.");
    const potentialIssues = [...profileMismatches];
    const recommendations = [
        "Review extracted values against the original document before relying on them.",
    ];
    if (missingInformation.length)
        recommendations.push("Resolve missing or unreadable fields and upload a clearer copy if needed.");
    if (expiryDate)
        recommendations.push(`Plan renewal before ${expiryDate}; this date is extracted, not authenticated.`);
    const documentType = lower.includes("gst")
        ? "GST Return"
        : lower.includes("udyam")
            ? "Udyam Certificate"
            : lower.includes("license") || lower.includes("licence")
                ? "Factory License"
                : "Business Document";
    return {
        documentType,
        expiryDate,
        extractedFields,
        profileMatches,
        profileMismatches,
        missingInformation,
        potentialIssues,
        recommendations,
        source,
    };
}
export const getDocuments = async (req, res) => {
    try {
        const list = await DocumentModel.find().sort({ createdAt: -1 });
        return res.json(list);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
export const uploadDocumentMetadata = async (req, res) => {
    try {
        const file = req.file;
        const { fileName, fileType } = req.body;
        if (!file)
            return res
                .status(400)
                .json({ error: "A PDF or image file is required." });
        const profile = (await BusinessProfile.findOne()) || {
            businessName: "",
            gstin: "",
            pan: "",
        };
        const text = await extractText(file.path, file.mimetype);
        const analysis = analyseText(text, file.originalname, profile);
        const rag = await searchGovernmentKnowledgeBase(`${analysis.documentType} expiry renewal document requirements`);
        const report = `Document review: ${analysis.documentType}. Extracted information has been compared with the business profile. This report supports review and does not authenticate the document or certify its legal validity.`;
        const newDoc = await DocumentModel.create({
            fileName: fileName || file?.originalname || "Uploaded_Document.pdf",
            fileType: fileType || analysis.documentType,
            uploadDate: new Date().toISOString().split("T")[0],
            fileSize: file
                ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                : "1.5 MB",
            status: analysis.potentialIssues.length || analysis.missingInformation.length
                ? "Action Needed"
                : "Analyzed",
            confidenceScore: Math.max(35, Math.min(98, Math.round((analysis.extractedFields.reduce((sum, item) => sum + item.confidence, 0) /
                analysis.extractedFields.length) *
                100))),
            extractedFields: analysis.extractedFields,
            detectedIssues: [
                ...analysis.potentialIssues,
                ...analysis.missingInformation,
            ],
            recommendations: analysis.recommendations,
            expiryDate: analysis.expiryDate,
            sourcePath: file.path,
            review: {
                extractedTextPreview: analysis.source.slice(0, 2000),
                profileMatches: analysis.profileMatches,
                profileMismatches: analysis.profileMismatches,
                missingInformation: analysis.missingInformation,
                potentialIssues: analysis.potentialIssues,
                reviewReport: report,
                ragGuidance: rag.map((citation) => `${citation.documentTitle}: ${citation.matchedText.slice(0, 240)}`),
            },
        });
        if (analysis.expiryDate) {
            const dueDate = new Date(analysis.expiryDate);
            const daysRemaining = Math.ceil((dueDate.getTime() - Date.now()) / 86400000);
            if (!Number.isNaN(dueDate.getTime()) && daysRemaining >= 0) {
                const deadline = await Deadline.findOneAndUpdate({
                    title: `Renew ${analysis.documentType}: ${newDoc.fileName}`,
                    dueDate: analysis.expiryDate,
                }, {
                    title: `Renew ${analysis.documentType}: ${newDoc.fileName}`,
                    category: "Document Renewal",
                    dueDate: analysis.expiryDate,
                    daysRemaining,
                    status: daysRemaining <= 30 ? "Urgent" : "Upcoming",
                    priority: daysRemaining <= 30 ? "high" : "medium",
                    authority: "Review issuing authority",
                }, { upsert: true, new: true });
                await ActionItem.findOneAndUpdate({
                    title: `Renew ${analysis.documentType}: ${newDoc.fileName}`,
                    dueDate: analysis.expiryDate,
                }, {
                    title: `Renew ${analysis.documentType}: ${newDoc.fileName}`,
                    category: "Document Fix",
                    priority: deadline?.priority || (daysRemaining <= 30 ? "high" : "medium"),
                    status: "Pending",
                    dueDate: analysis.expiryDate,
                    estimatedTimeMinutes: 45,
                    impactSummary: `Keep the ${analysis.documentType} current and avoid an interruption caused by an expired document.`,
                    steps: [
                        "Review the extracted expiry date and original document.",
                        "Confirm renewal requirements with the issuing authority.",
                        "Submit the renewal before the detected expiry date.",
                    ],
                }, { upsert: true, new: true });
            }
        }
        await fs.unlink(path.resolve(file.path)).catch(() => undefined);
        return res.status(201).json(newDoc);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
