import { Router } from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
const router = Router();
router.get('/', async (req, res, next) => { try { res.json({ orders: await Order.find({ owner: req.user._id }).sort({ createdAt: -1 }) }); } catch (e) { next(e); } });
// Creates an unpaid order only. This endpoint intentionally does not claim payment success.
router.post('/', async (req, res, next) => { try {
  const { items, shippingAddress } = req.body || {};
  if (!Array.isArray(items) || items.length < 1 || items.length > 30) return res.status(400).json({ error: 'Add between 1 and 30 order items.' });
  if (typeof shippingAddress !== 'string' || shippingAddress.trim().length < 8 || shippingAddress.length > 1000) return res.status(400).json({ error: 'A valid shipping address is required.' });
  const ids = [...new Set(items.map(i => String(i.productId || '')))];
  const products = await Product.find({ _id: { $in: ids }, isActive: true });
  const byId = new Map(products.map(p => [p._id.toString(), p]));
  let subtotalInr = 0; const orderItems = [];
  for (const item of items) {
    const p = byId.get(String(item.productId)); const qty = Number(item.quantity);
    if (!p || !Number.isInteger(qty) || qty < 1 || qty > 100) return res.status(400).json({ error: 'An order item is invalid or unavailable.' });
    if (p.stock < qty) return res.status(409).json({ error: `Insufficient stock for ${p.name}.` });
    subtotalInr += p.priceInr * qty; orderItems.push({ product: p._id, nameSnapshot: p.name, unitPriceInr: p.priceInr, quantity: qty });
  }
  const order = await Order.create({ owner: req.user._id, items: orderItems, subtotalInr, shippingAddress: shippingAddress.trim(), status: 'pending_payment', paymentProvider: 'none' });
  res.status(201).json({ order, message: 'Order created as pending payment. No payment has been taken.' });
} catch (e) { next(e); } });
router.get('/:id', async (req, res, next) => { try { const order = await Order.findOne({ _id: req.params.id, owner: req.user._id }); if (!order) return res.status(404).json({ error: 'Order not found.' }); res.json({ order }); } catch (e) { next(e); } });
export default router;
