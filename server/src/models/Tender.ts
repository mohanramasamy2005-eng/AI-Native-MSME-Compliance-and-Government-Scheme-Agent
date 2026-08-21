import mongoose, { Schema, Document } from 'mongoose';

export interface ITender extends Document {
  title: string;
  issuingOrg: string;
  category: string;
  estimatedValue: string;
  location: string;
  submissionDeadline: string;
  matchScore: number;
  status: 'Open' | 'Under Review' | 'Submitted';
  tenderNoticeNo: string;
  createdAt: Date;
  updatedAt: Date;
}

const TenderSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    issuingOrg: { type: String, required: true },
    category: { type: String, required: true },
    estimatedValue: { type: String, required: true },
    location: { type: String, required: true },
    submissionDeadline: { type: String, required: true },
    matchScore: { type: Number, default: 85 },
    status: { type: String, enum: ['Open', 'Under Review', 'Submitted'], default: 'Open' },
    tenderNoticeNo: { type: String, required: true },
  },
  { timestamps: true }
);

export const Tender = mongoose.model<ITender>('Tender', TenderSchema);
