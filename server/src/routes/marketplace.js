import { Router } from 'express';
import Product from '../models/Product.js';
const router = Router();
router.get('/products', async (req, res, next) => { try { const filter = { isActive: true }; if (req.query.category) filter.category = String(req.query.category); if (req.query.q) filter.$text = { $search: String(req.query.q).slice(0, 80) }; const products = await Product.find(filter).select('name slug description category priceInr unit stock imageUrl').sort({ createdAt: -1 }).limit(100); res.json({ products }); } catch (e) { next(e); } });
export default router;
