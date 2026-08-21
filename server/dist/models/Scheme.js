import mongoose, { Schema } from 'mongoose';
const SchemeSchema = new Schema({
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
}, { timestamps: true });
export const Scheme = mongoose.model('Scheme', SchemeSchema);
