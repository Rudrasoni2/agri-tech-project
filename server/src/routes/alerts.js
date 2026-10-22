import { Router } from 'express';
import Alert from '../models/Alert.js';
const router = Router();
router.get('/', async (req, res, next) => { try { const filter = { owner: req.user._id }; if (req.query.status) filter.status = req.query.status; res.json({ alerts: await Alert.find(filter).populate('farm', 'name').populate('crop', 'name').sort({ createdAt: -1 }).limit(100) }); } catch (e) { next(e); } });
router.post('/', async (req, res, next) => { try { const { farm, crop, type, severity, title, description } = req.body || {}; if (!type || !title?.trim() || !description?.trim()) return res.status(400).json({ error: 'Type, title, and description are required.' }); const alert = await Alert.create({ owner: req.user._id, farm, crop, type, severity, title: title.trim(), description: description.trim(), source: 'manual' }); res.status(201).json({ alert }); } catch (e) { next(e); } });
router.patch('/:id', async (req, res, next) => { try { const status = req.body?.status; if (!['open', 'acknowledged', 'resolved', 'archived'].includes(status)) return res.status(400).json({ error: 'Invalid alert status.' }); const alert = await Alert.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, { status }, { new: true, runValidators: true }); if (!alert) return res.status(404).json({ error: 'Alert not found.' }); res.json({ alert }); } catch (e) { next(e); } });
export default router;
