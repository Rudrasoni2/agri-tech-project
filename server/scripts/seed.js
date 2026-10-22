import 'dotenv/config';
import mongoose from 'mongoose';
import Product from '../src/models/Product.js';

const products = [
  { name: 'Organic Neem Oil', slug: 'organic-neem-oil', description: 'A plant-derived crop-care input. Follow product label directions and locally approved guidance.', category: 'Crop protection', priceInr: 349, unit: '500 ml', stock: 25, isActive: true },
  { name: 'Soil Health Test Kit', slug: 'soil-health-test-kit', description: 'Example soil sampling kit listing. Laboratory testing may still be required for reliable nutrient measurements.', category: 'Soil & nutrients', priceInr: 799, unit: '1 kit', stock: 12, isActive: true },
  { name: 'Drip Irrigation Starter', slug: 'drip-irrigation-starter', description: 'Starter irrigation kit listing. Confirm field suitability and specifications before purchase.', category: 'Irrigation', priceInr: 1249, unit: '1 set', stock: 8, isActive: true },
  { name: 'Vermicompost', slug: 'vermicompost-25kg', description: 'Organic soil amendment listing. Verify composition and supplier details before applying.', category: 'Fertilizers', priceInr: 420, unit: '25 kg', stock: 30, isActive: true }
];
try {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is required. Copy server/.env.example to server/.env first.');
  await mongoose.connect(process.env.MONGODB_URI);
  for (const product of products) await Product.updateOne({ slug: product.slug }, { $set: product }, { upsert: true });
  console.log(`Seeded ${products.length} demo marketplace products.`);
} catch (error) { console.error(error.message); process.exitCode = 1; }
finally { await mongoose.disconnect(); }
