import mongoose from 'mongoose';
const consultationSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  expert: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert', required: true, index: true },
  startsAt: { type: Date, required: true },
  method: { type: String, enum: ['phone', 'video', 'chat'], required: true },
  question: { type: String, trim: true, maxlength: 2000 },
  status: { type: String, enum: ['requested', 'confirmed', 'completed', 'cancelled'], default: 'requested', index: true }
}, { timestamps: true, versionKey: false });
consultationSchema.index({ expert: 1, startsAt: 1, status: 1 });
export default mongoose.model('Consultation', consultationSchema);
