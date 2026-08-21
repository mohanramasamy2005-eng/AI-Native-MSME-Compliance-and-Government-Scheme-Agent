import mongoose, { Schema, Document } from 'mongoose';

export interface IActionItem extends Document {
  businessId?: mongoose.Types.ObjectId;
  title: string;
  category: 'Compliance' | 'Grant Application' | 'Document Fix' | 'Tax Filing' | 'Certification';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
  estimatedTimeMinutes: number;
  impactSummary: string;
  steps: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ActionItemSchema: Schema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: 'BusinessProfile' },
    title: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: String, enum: ['critical', 'high', 'medium', 'low'], default: 'medium' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    dueDate: { type: String, required: true },
    estimatedTimeMinutes: { type: Number, default: 20 },
    impactSummary: { type: String, required: true },
    steps: [{ type: String }],
  },
  { timestamps: true }
);

export const ActionItem = mongoose.model<IActionItem>('ActionItem', ActionItemSchema);
