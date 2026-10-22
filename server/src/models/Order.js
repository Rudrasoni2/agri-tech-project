import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, nameSnapshot: String, unitPriceInr: Number, quantity: { type: Number, min: 1, required: true } }],
  subtotalInr: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['pending_payment', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'payment_failed'], default: 'pending_payment', index: true },
  paymentProvider: { type: String, enum: ['none', 'razorpay'], default: 'none' },
  paymentReference: { type: String, select: false },
  shippingAddress: { type: String, required: true, maxlength: 1000 }
}, { timestamps: true, versionKey: false });
orderSchema.index({ owner: 1, createdAt: -1 });
export default mongoose.model('Order', orderSchema);
