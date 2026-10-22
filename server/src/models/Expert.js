import mongoose from 'mongoose';
const expertSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  displayName: { type: String, required: true, trim: true, maxlength: 120 },
  specializations: [{ type: String, maxlength: 100 }],
  languages: [{ type: String, enum: ['en', 'hi', 'mr', 'gu', 'pa', 'ta', 'te', 'kn'] }],
  bio: { type: String, maxlength: 3000 },
  yearsExperience: { type: Number, min: 0, max: 80 },
  consultationMethods: [{ type: String, enum: ['phone', 'video', 'chat'] }],
  verificationStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending', index: true },
  isAvailable: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false });
export default mongoose.model('Expert', expertSchema);
