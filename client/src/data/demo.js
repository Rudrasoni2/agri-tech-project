export const initialFarms = [
  { id: 'farm-1', name: 'Green Valley Farm', location: 'Dewas, Madhya Pradesh', area: 12.5, soil: 'Black cotton soil', status: 'Active', crops: ['Soybean', 'Wheat'], initials: 'GV', tone: 'sage' },
  { id: 'farm-2', name: 'Sunrise Fields', location: 'Indore, Madhya Pradesh', area: 8.2, soil: 'Alluvial soil', status: 'Active', crops: ['Tomato', 'Onion'], initials: 'SF', tone: 'gold' },
  { id: 'farm-3', name: 'Riverside Plot', location: 'Ujjain, Madhya Pradesh', area: 5.7, soil: 'Clay loam', status: 'Planning', crops: ['Wheat'], initials: 'RP', tone: 'blue' }
];
export const initialCrops = [
  { id: 1, name: 'Soybean', variety: 'JS 20-29', farm: 'Green Valley Farm', stage: 'Flowering', progress: 68, planted: '12 Jun 2026', harvest: '18 Oct 2026', area: '7.5 acres', color: 'green' },
  { id: 2, name: 'Wheat', variety: 'Lokwan', farm: 'Green Valley Farm', stage: 'Sowing prep', progress: 14, planted: '—', harvest: 'Mar 2027', area: '5 acres', color: 'gold' },
  { id: 3, name: 'Tomato', variety: 'Arka Rakshak', farm: 'Sunrise Fields', stage: 'Fruit development', progress: 81, planted: '22 May 2026', harvest: '05 Nov 2026', area: '3.2 acres', color: 'red' }
];
export const initialProducts = [
  { id: 1, name: 'Organic Neem Oil', category: 'Crop protection', price: 349, unit: '500 ml', rating: '4.8', icon: 'leaf', tag: 'Organic', color: 'product-green' },
  { id: 2, name: 'Soil Health Test Kit', category: 'Soil & nutrients', price: 799, unit: '1 kit', rating: '4.9', icon: 'flask', tag: 'Best seller', color: 'product-blue' },
  { id: 3, name: 'Drip Irrigation Starter', category: 'Irrigation', price: 1249, unit: '1 set', rating: '4.7', icon: 'droplet', tag: 'Save water', color: 'product-purple' },
  { id: 4, name: 'Vermicompost', category: 'Fertilizers', price: 420, unit: '25 kg', rating: '4.6', icon: 'sprout', tag: 'Natural', color: 'product-brown' }
];
export const initialPosts = [
  { id: 1, initials: 'RK', name: 'Ramesh K.', time: '2 hours ago', topic: 'Crop care', title: 'Best time to apply neem oil for soybean?', body: 'Noticed a few whiteflies on the lower leaves this week. Has anyone had good results with neem oil application in the early morning?', likes: 18, replies: 7, color: 'avatar-green' },
  { id: 2, initials: 'SP', name: 'Sunita P.', time: 'Yesterday', topic: 'Soil health', title: 'Sharing my soil testing experience', body: 'Got my soil tested before the next sowing cycle. The report helped me avoid applying nutrients that were already at a good level.', likes: 32, replies: 12, color: 'avatar-orange' }
];
export const articles = [
  { category: 'CROP GUIDE', time: '6 min read', title: 'A practical guide to soybean flowering stage', description: 'Water management, scouting, and nutrient tips for healthier pod formation.', image: 'soy' },
  { category: 'SOIL HEALTH', time: '4 min read', title: 'Understanding your soil test report', description: 'Learn what pH, NPK, and organic carbon tell you about your field.', image: 'soil' },
  { category: 'WATER SMART', time: '5 min read', title: 'Smarter irrigation during changing weather', description: 'Simple ways to plan watering around rainfall and crop stage.', image: 'water' }
];
