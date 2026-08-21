import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  name: string;
  role: 'owner' | 'accountant' | 'admin';
  businessProfileId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['owner', 'accountant', 'admin'], default: 'owner' },
    businessProfileId: { type: Schema.Types.ObjectId, ref: 'BusinessProfile' },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
