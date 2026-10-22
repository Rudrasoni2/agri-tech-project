import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function issueToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '2h', issuer: 'agri-tech-api', audience: 'agri-tech-client' });
}
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, phone, preferredLanguage = 'en', region } = req.body || {};
    if (!name?.trim() || name.trim().length > 100) return res.status(400).json({ error: 'Enter your name (up to 100 characters).' });
    if (!emailPattern.test(String(email || ''))) return res.status(400).json({ error: 'Enter a valid email address.' });
    if (typeof password !== 'string' || password.length < 10 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) return res.status(400).json({ error: 'Password must be at least 10 characters and include letters and numbers.' });
    if (!['en', 'hi'].includes(preferredLanguage)) return res.status(400).json({ error: 'Unsupported preferred language.' });
    const normalizedEmail = email.trim().toLowerCase();
    if (await User.exists({ email: normalizedEmail })) return res.status(409).json({ error: 'An account with this email already exists.' });
    const passwordHash = await bcrypt.hash(password, 12);
    // Public registration always creates a farmer. Admin privileges must be granted out-of-band.
    const user = await User.create({ name: name.trim(), email: normalizedEmail, passwordHash, phone, preferredLanguage, region, role: 'farmer' });
    return res.status(201).json({ token: issueToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role, preferredLanguage: user.preferredLanguage, region: user.region } });
  } catch (err) { next(err); }
});
router.post('/login', async (req, res, next) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = req.body?.password;
    if (!emailPattern.test(email) || typeof password !== 'string') return res.status(400).json({ error: 'Enter your email and password.' });
    const user = await User.findOne({ email }).select('+passwordHash name email role preferredLanguage region isActive');
    if (!user || !user.isActive || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ error: 'Email or password is incorrect.' });
    return res.json({ token: issueToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role, preferredLanguage: user.preferredLanguage, region: user.region } });
  } catch (err) { next(err); }
});
router.get('/me', requireAuth, (req, res) => res.json({ user: { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role, preferredLanguage: req.user.preferredLanguage, region: req.user.region } }));
export default router;
