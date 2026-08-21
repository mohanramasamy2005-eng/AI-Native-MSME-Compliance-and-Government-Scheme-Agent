import mongoose, { Schema, Document } from 'mongoose';

export interface ICompliance extends Document {
  businessId?: mongoose.Types.ObjectId;
  title: string;
  category: 'Taxation' | 'Labor & Safety' | 'Environmental' | 'Corporate Governance' | 'License & Permit';
  issuingAuthority: string;
  periodicity: 'Monthly' | 'Quarterly' | 'Annual' | 'Bi-Annual' | 'One-Time';
  status: 'active' | 'verified' | 'pending' | 'due_soon' | 'overdue' | 'critical';
  dueDate: string;
  description: string;
  potentialPenalty?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ComplianceSchema: Schema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: 'BusinessProfile' },
    title: { type: String, required: true },
    category: { type: String, required: true },
    issuingAuthority: { type: String, required: true },
    periodicity: { type: String, required: true },
    status: { type: String, required: true, default: 'pending' },
    dueDate: { type: String, required: true },
    description: { type: String, required: true },
    potentialPenalty: { type: String },
  },
  { timestamps: true }
);

export const Compliance = mongoose.model<ICompliance>('Compliance', ComplianceSchema);
