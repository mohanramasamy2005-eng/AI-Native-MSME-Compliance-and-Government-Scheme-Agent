import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['owner', 'accountant', 'admin'], default: 'owner' },
    businessProfileId: { type: Schema.Types.ObjectId, ref: 'BusinessProfile' },
}, { timestamps: true });
export const User = mongoose.model('User', UserSchema);
