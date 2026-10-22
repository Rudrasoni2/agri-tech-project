import { Router } from 'express';
import SoilReport from '../models/SoilReport.js';
import Farm from '../models/Farm.js';
const router = Router();
router.get('/', async (req, res, next) => { try { const filter = { owner: req.user._id }; if (req.query.farm) filter.farm = req.query.farm; res.json({ reports: await SoilReport.find(filter).populate('farm', 'name').sort({ testedAt: -1 }) }); } catch (e) { next(e); } });
router.post('/', async (req, res, next) => { try { const { farm, testedAt, source, ph, nitrogen, phosphorus, potassium, organicCarbonPct, labName, notes } = req.body || {}; if (!farm || !testedAt) return res.status(400).json({ error: 'Farm and test date are required.' }); if (!await Farm.exists({ _id: farm, owner: req.user._id })) return res.status(404).json({ error: 'Farm not found.' }); const report = await SoilReport.create({ owner: req.user._id, farm, testedAt, source, ph, nitrogen, phosphorus, potassium, organicCarbonPct, labName, notes }); res.status(201).json({ report }); } catch (e) { next(e); } });
router.delete('/:id', async (req, res, next) => { try { const result = await SoilReport.findOneAndDelete({ _id: req.params.id, owner: req.user._id }); if (!result) return res.status(404).json({ error: 'Soil report not found.' }); res.json({ success: true }); } catch (e) { next(e); } });
export default router;
