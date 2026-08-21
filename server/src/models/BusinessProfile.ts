import mongoose, { Schema, Document } from 'mongoose';

export interface IBusinessProfile extends Document {
  userId: mongoose.Types.ObjectId;
  businessName: string;
  tradeName: string;
  entityType: string;
  sector: string;
  location: string;
  district: string;
  state: string;
  turnoverFY: string;
  turnoverValue: number;
  udyamStatus: 'Active' | 'Pending' | 'Not Registered';
  udyamRegistrationNo?: string;
  gstin?: string;
  pan?: string;
  employeeCount: number;
  incorporationYear: number;
  nextRenewal: string;
  complianceHealthScore: number;
  createdAt: Date;
  updatedAt: Date;
}

const BusinessProfileSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    businessName: { type: String, required: true },
    tradeName: { type: String, required: true },
    entityType: { type: String, required: true },
    sector: { type: String, required: true },
    location: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    turnoverFY: { type: String, required: true, default: 'FY 2025-26' },
    turnoverValue: { type: Number, required: true, default: 1.2 },
    udyamStatus: { type: String, enum: ['Active', 'Pending', 'Not Registered'], default: 'Active' },
    udyamRegistrationNo: { type: String },
    gstin: { type: String },
    pan: { type: String },
    employeeCount: { type: Number, default: 10 },
    incorporationYear: { type: Number, default: 2020 },
    nextRenewal: { type: String, default: 'Pollution Consent' },
    complianceHealthScore: { type: Number, default: 78 },
  },
  { timestamps: true }
);

export const BusinessProfile = mongoose.model<IBusinessProfile>('BusinessProfile', BusinessProfileSchema);
