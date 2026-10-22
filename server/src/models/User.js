import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  phone: { type: String, trim: true, maxlength: 20 },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ['farmer', 'expert', 'admin'], default: 'farmer', index: true },
  preferredLanguage: { type: String, enum: ['en', 'hi'], default: 'en' },
  region: { type: String, trim: true, maxlength: 120 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true, versionKey: false });

export default mongoose.model('User', userSchema);
