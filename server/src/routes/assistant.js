import { Router } from 'express';
const router = Router();
router.post('/', async (req, res) => {
  const question = String(req.body?.question || '').trim();
  if (!question || question.length > 2000) return res.status(400).json({ error: 'Enter a question up to 2,000 characters.' });
  if (!process.env.AI_API_KEY || !process.env.AI_API_URL) return res.status(503).json({ error: 'AI assistant is not configured. Add AI_API_URL and AI_API_KEY on the server.', code: 'AI_NOT_CONFIGURED' });
  // Provider-specific payloads intentionally remain unimplemented until a provider is chosen.
  return res.status(501).json({ error: 'AI provider adapter is not implemented yet. No generated answer was returned.', code: 'AI_ADAPTER_REQUIRED' });
});
export default router;
