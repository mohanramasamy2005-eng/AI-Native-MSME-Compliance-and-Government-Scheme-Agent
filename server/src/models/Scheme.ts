import mongoose, { Schema, Document } from 'mongoose';

export interface IScheme extends Document {
  title: string;
  ministry: string;
  category: 'Credit Guarantee' | 'Technology Upgradation' | 'Subsidy' | 'Export Support' | 'Infrastructure';
  description: string;
  fundingAmount: string;
  eligibilityMatch: number;
  eligibilityCriteria: string[];
  keyBenefits: string[];
  deadline: string;
  officialUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SchemeSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    ministry: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    fundingAmount: { type: String, required: true },
    eligibilityMatch: { type: Number, default: 85 },
    eligibilityCriteria: [{ type: String }],
    keyBenefits: [{ type: String }],
    deadline: { type: String, required: true },
    officialUrl: { type: String },
  },
  { timestamps: true }
);

export const Scheme = mongoose.model<IScheme>('Scheme', SchemeSchema);
