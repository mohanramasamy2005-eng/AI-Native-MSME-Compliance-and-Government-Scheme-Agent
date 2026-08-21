import mongoose, { Schema, Document } from "mongoose";

export interface IExtractedField {
  label: string;
  value: string;
  confidence: number;
}

export interface IDocumentReview {
  extractedTextPreview: string;
  profileMatches: string[];
  profileMismatches: string[];
  missingInformation: string[];
  potentialIssues: string[];
  reviewReport: string;
  ragGuidance: string[];
}

export interface IDocument extends Document {
  businessId?: mongoose.Types.ObjectId;
  fileName: string;
  fileType: string;
  uploadDate: string;
  fileSize: string;
  status: "Analyzed" | "Action Needed" | "Processing";
  confidenceScore: number;
  extractedFields: IExtractedField[];
  detectedIssues: string[];
  recommendations: string[];
  expiryDate?: string;
  review?: IDocumentReview;
  sourcePath?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema: Schema = new Schema(
  {
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
  },
  { timestamps: true },
);

export const DocumentModel = mongoose.model<IDocument>(
  "Document",
  DocumentSchema,
);
