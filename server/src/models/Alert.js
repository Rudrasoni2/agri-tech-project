import mongoose from 'mongoose';
const alertSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  farm: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm' },
  crop: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop' },
  type: { type: String, enum: ['pest', 'disease', 'weather', 'irrigation', 'reminder'], required: true },
  severity: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  title: { type: String, required: true, trim: true, maxlength: 180 },
  description: { type: String, required: true, trim: true, maxlength: 3000 },
  status: { type: String, enum: ['open', 'acknowledged', 'resolved', 'archived'], default: 'open', index: true },
  source: { type: String, enum: ['manual', 'integration', 'system'], default: 'manual' }
}, { timestamps: true, versionKey: false });
alertSchema.index({ owner: 1, status: 1, createdAt: -1 });
export default mongoose.model('Alert', alertSchema);
