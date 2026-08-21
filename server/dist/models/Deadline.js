import mongoose, { Schema } from 'mongoose';
const DeadlineSchema = new Schema({
    businessId: { type: Schema.Types.ObjectId, ref: 'BusinessProfile' },
    title: { type: String, required: true },
    category: { type: String, required: true },
    dueDate: { type: String, required: true },
    daysRemaining: { type: Number, required: true },
    status: { type: String, enum: ['Urgent', 'Upcoming', 'Completed'], default: 'Upcoming' },
    priority: { type: String, enum: ['critical', 'high', 'medium', 'low'], default: 'medium' },
    authority: { type: String, required: true },
}, { timestamps: true });
export const Deadline = mongoose.model('Deadline', DeadlineSchema);
