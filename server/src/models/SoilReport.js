import mongoose from 'mongoose';
const soilReportSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  farm: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true, index: true },
  testedAt: { type: Date, required: true },
  source: { type: String, enum: ['lab', 'manual'], default: 'manual' },
  ph: { type: Number, min: 0, max: 14 },
  nitrogen: { type: String, enum: ['low', 'medium', 'high', 'unknown'], default: 'unknown' },
  phosphorus: { type: String, enum: ['low', 'medium', 'high', 'unknown'], default: 'unknown' },
  potassium: { type: String, enum: ['low', 'medium', 'high', 'unknown'], default: 'unknown' },
  organicCarbonPct: { type: Number, min: 0, max: 100 },
  labName: { type: String, trim: true, maxlength: 120 },
  notes: { type: String, trim: true, maxlength: 2000 }
}, { timestamps: true, versionKey: false });
soilReportSchema.index({ owner: 1, farm: 1, testedAt: -1 });
export default mongoose.model('SoilReport', soilReportSchema);
