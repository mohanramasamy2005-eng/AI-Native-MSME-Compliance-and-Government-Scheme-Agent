import mongoose, { Schema, Document } from 'mongoose';

export interface IDeadline extends Document {
  businessId?: mongoose.Types.ObjectId;
  title: string;
  category: string;
  dueDate: string;
  daysRemaining: number;
  status: 'Urgent' | 'Upcoming' | 'Completed';
  priority: 'critical' | 'high' | 'medium' | 'low';
  authority: string;
  createdAt: Date;
  updatedAt: Date;
}

const DeadlineSchema: Schema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: 'BusinessProfile' },
    title: { type: String, required: true },
    category: { type: String, required: true },
    dueDate: { type: String, required: true },
    daysRemaining: { type: Number, required: true },
    status: { type: String, enum: ['Urgent', 'Upcoming', 'Completed'], default: 'Upcoming' },
    priority: { type: String, enum: ['critical', 'high', 'medium', 'low'], default: 'medium' },
    authority: { type: String, required: true },
  },
  { timestamps: true }
);

export const Deadline = mongoose.model<IDeadline>('Deadline', DeadlineSchema);
