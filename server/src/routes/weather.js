import { Router } from 'express';
const router = Router();
router.get('/', async (req, res) => {
  const city = String(req.query.city || '').trim();
  if (!city || city.length > 120) return res.status(400).json({ error: 'Provide a city or location label.' });
  if (!process.env.OPENWEATHER_API_KEY) return res.status(503).json({ error: 'Live weather is not configured. Add OPENWEATHER_API_KEY to server/.env.', code: 'WEATHER_NOT_CONFIGURED' });
  try {
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.searchParams.set('q', city); url.searchParams.set('appid', process.env.OPENWEATHER_API_KEY); url.searchParams.set('units', 'metric');
    const upstream = await fetch(url, { signal: AbortSignal.timeout(7000) });
    if (!upstream.ok) return res.status(upstream.status === 404 ? 404 : 502).json({ error: upstream.status === 404 ? 'Location was not found by the weather provider.' : 'Weather provider request failed.' });
    const raw = await upstream.json();
    res.set('Cache-Control', 'public, max-age=300');
    return res.json({ source: 'OpenWeather', fetchedAt: new Date().toISOString(), location: { name: raw.name, country: raw.sys?.country, coordinates: raw.coord }, current: { temperatureC: raw.main?.temp, feelsLikeC: raw.main?.feels_like, humidityPct: raw.main?.humidity, windKph: raw.wind?.speed == null ? null : Math.round(raw.wind.speed * 3.6), condition: raw.weather?.[0]?.description, icon: raw.weather?.[0]?.icon } });
  } catch (error) { return res.status(502).json({ error: error.name === 'TimeoutError' ? 'Weather provider timed out.' : 'Unable to retrieve live weather right now.' }); }
});
export default router;
