import mongoose, { Schema, Document } from 'mongoose';

export interface ICertification extends Document {
  businessId?: mongoose.Types.ObjectId;
  name: string;
  issuingBody: string;
  category: 'Quality' | 'Safety' | 'Environmental' | 'Export' | 'Sustainability';
  certificateNumber: string;
  validFrom: string;
  validUntil: string;
  status: 'Active' | 'Renewal Pending' | 'Expired';
  createdAt: Date;
  updatedAt: Date;
}

const CertificationSchema: Schema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: 'BusinessProfile' },
    name: { type: String, required: true },
    issuingBody: { type: String, required: true },
    category: { type: String, required: true },
    certificateNumber: { type: String, required: true },
    validFrom: { type: String, required: true },
    validUntil: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Renewal Pending', 'Expired'], default: 'Active' },
  },
  { timestamps: true }
);

export const Certification = mongoose.model<ICertification>('Certification', CertificationSchema);
