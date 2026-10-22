export function notFound(req, res) { res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` }); }
export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  if (err?.name === 'ValidationError') return res.status(400).json({ error: 'Validation failed.', details: Object.values(err.errors).map(e => e.message) });
  if (err?.code === 11000) return res.status(409).json({ error: 'A record with that value already exists.' });
  if (err?.name === 'CastError') return res.status(400).json({ error: 'Invalid identifier or value.' });
  const status = Number(err.status) || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: status >= 500 ? 'An unexpected server error occurred.' : err.message });
}
