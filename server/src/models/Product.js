import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 180 },
  slug: { type: String, required: true, unique: true, lowercase: true, index: true },
  description: { type: String, required: true, maxlength: 3000 },
  category: { type: String, required: true, index: true },
  priceInr: { type: Number, required: true, min: 0 },
  unit: { type: String, required: true, maxlength: 60 },
  stock: { type: Number, min: 0, default: 0 },
  isActive: { type: Boolean, default: true, index: true },
  imageUrl: { type: String, trim: true }
}, { timestamps: true, versionKey: false });
productSchema.index({ name: 'text', description: 'text', category: 'text' });
export default mongoose.model('Product', productSchema);
