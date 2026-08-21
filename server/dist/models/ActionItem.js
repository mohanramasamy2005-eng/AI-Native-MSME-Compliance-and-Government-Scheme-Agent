import mongoose, { Schema } from 'mongoose';
const ActionItemSchema = new Schema({
    businessId: { type: Schema.Types.ObjectId, ref: 'BusinessProfile' },
    title: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: String, enum: ['critical', 'high', 'medium', 'low'], default: 'medium' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    dueDate: { type: String, required: true },
    estimatedTimeMinutes: { type: Number, default: 20 },
    impactSummary: { type: String, required: true },
    steps: [{ type: String }],
}, { timestamps: true });
export const ActionItem = mongoose.model('ActionItem', ActionItemSchema);
