import { Request, Response } from 'express';
import { buildBusinessContext } from '../services/aiContextService.js';
import { defaultAiProvider } from '../services/aiProvider.js';

export const handleAiChat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message query is required' });
    }

    // 1. Build live business context from DB
    const context = await buildBusinessContext();

    // 2. Delegate to LLM provider service layer
    const response = await defaultAiProvider.generateStructuredResponse(context, message.trim());

    return res.json(response);
  } catch (err: any) {
    console.error('AI Controller Error:', err);
    return res.status(500).json({ error: err.message || 'Error generating AI response' });
  }
};
