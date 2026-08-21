import mongoose, { Schema } from "mongoose";
const DocumentSchema = new Schema({
    businessId: { type: Schema.Types.ObjectId, ref: "BusinessProfile" },
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    uploadDate: { type: String, required: true },
    fileSize: { type: String, required: true },
    status: {
        type: String,
        enum: ["Analyzed", "Action Needed", "Processing"],
        default: "Analyzed",
    },
    confidenceScore: { type: Number, default: 95 },
    extractedFields: [
        {
            label: { type: String, required: true },
            value: { type: String, required: true },
            confidence: { type: Number, default: 0.95 },
        },
    ],
    detectedIssues: [{ type: String }],
    recommendations: [{ type: String }],
    expiryDate: { type: String },
    review: {
        extractedTextPreview: { type: String, default: "" },
        profileMatches: [{ type: String }],
        profileMismatches: [{ type: String }],
        missingInformation: [{ type: String }],
        potentialIssues: [{ type: String }],
        reviewReport: { type: String, default: "" },
        ragGuidance: [{ type: String }],
    },
    sourcePath: { type: String },
}, { timestamps: true });
export const DocumentModel = mongoose.model("Document", DocumentSchema);
