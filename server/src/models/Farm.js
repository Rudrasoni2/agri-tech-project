import mongoose from 'mongoose';
const farmSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 120 },
  location: { type: String, required: true, trim: true, maxlength: 180 },
  areaAcres: { type: Number, required: true, min: 0.1 },
  soilType: { type: String, trim: true, maxlength: 80, default: 'Not tested' },
  status: { type: String, enum: ['active', 'planning', 'archived'], default: 'active' },
  notes: { type: String, trim: true, maxlength: 2000 }
}, { timestamps: true, versionKey: false });
farmSchema.index({ owner: 1, name: 1 });
export default mongoose.model('Farm', farmSchema);
