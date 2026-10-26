import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import farmRoutes from './routes/farms.js';
import cropRoutes from './routes/crops.js';
import soilRoutes from './routes/soil.js';
import weatherRoutes from './routes/weather.js';
import marketplaceRoutes from './routes/marketplace.js';
import orderRoutes from './routes/orders.js';
import alertRoutes from './routes/alerts.js';
import communityRoutes from './routes/community.js';
import expertRoutes from './routes/experts.js';
import assistantRoutes from './routes/assistant.js';
import { requireAuth } from './middleware/auth.js';
import { errorHandler, notFound } from './middleware/errors.js';

const app = express();
const port = Number(process.env.PORT || 5000);
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map(s => s.trim()), credentials: false, methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json({ limit: '200kb' }));
app.use(cookieParser());
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 15, standardHeaders: 'draft-7', legacyHeaders: false, message: { error: 'Too many authentication attempts. Try again later.' } }));
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'agri-tech-api', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected', timestamp: new Date().toISOString() }));
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/farms', requireAuth, farmRoutes);
app.use('/api/crops', requireAuth, cropRoutes);
app.use('/api/soil-reports', requireAuth, soilRoutes);
app.use('/api/orders', requireAuth, orderRoutes);
app.use('/api/alerts', requireAuth, alertRoutes);
app.use('/api/community', requireAuth, communityRoutes);
app.use('/api/experts', requireAuth, expertRoutes);
app.use('/api/assistant', requireAuth, assistantRoutes);
app.use(notFound);
app.use(errorHandler);
console.log(
  'MONGODB_URI configured:',
  Boolean(process.env.MONGODB_URI)
);

if (!process.env.MONGODB_URI) {
  console.error('MongoDB connection skipped: MONGODB_URI is missing');
} else {
  console.log('Attempting MongoDB connection...');

  mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000
  })
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch(err => {
      console.error('MongoDB connection failed:', err.message);
    });
}
const server = app.listen(port, () => console.log(`Agri-Tech API listening on http://localhost:${port}`));
const shutdown = async signal => { console.log(`${signal} received; shutting down`); server.close(async () => { await mongoose.disconnect(); process.exit(0); }); };
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
export default app;
