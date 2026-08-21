import mongoose, { Schema } from 'mongoose';
const CertificationSchema = new Schema({
    businessId: { type: Schema.Types.ObjectId, ref: 'BusinessProfile' },
    name: { type: String, required: true },
    issuingBody: { type: String, required: true },
    category: { type: String, required: true },
    certificateNumber: { type: String, required: true },
    validFrom: { type: String, required: true },
    validUntil: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Renewal Pending', 'Expired'], default: 'Active' },
}, { timestamps: true });
export const Certification = mongoose.model('Certification', CertificationSchema);
