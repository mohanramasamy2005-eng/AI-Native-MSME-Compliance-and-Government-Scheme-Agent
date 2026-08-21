import mongoose, { Schema } from 'mongoose';
const ComplianceSchema = new Schema({
    businessId: { type: Schema.Types.ObjectId, ref: 'BusinessProfile' },
    title: { type: String, required: true },
    category: { type: String, required: true },
    issuingAuthority: { type: String, required: true },
    periodicity: { type: String, required: true },
    status: { type: String, required: true, default: 'pending' },
    dueDate: { type: String, required: true },
    description: { type: String, required: true },
    potentialPenalty: { type: String },
}, { timestamps: true });
export const Compliance = mongoose.model('Compliance', ComplianceSchema);
