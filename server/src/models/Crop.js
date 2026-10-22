import mongoose from 'mongoose';
const cropSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  farm: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  variety: { type: String, trim: true, maxlength: 100 },
  areaAcres: { type: Number, min: 0 },
  stage: { type: String, enum: ['planning', 'sowing', 'vegetative', 'flowering', 'fruiting', 'harvest', 'completed'], default: 'planning' },
  sowingDate: Date,
  expectedHarvestDate: Date,
  notes: { type: String, trim: true, maxlength: 2000 }
}, { timestamps: true, versionKey: false });
cropSchema.index({ owner: 1, farm: 1, stage: 1 });
export default mongoose.model('Crop', cropSchema);
