import { Request, Response } from 'express';
import { KnowledgeDocument } from '../models/KnowledgeDocument.js';
import { ingestGovernmentKnowledgeBase } from '../services/ragIngestionService.js';
import { searchGovernmentKnowledgeBase } from '../services/ragRetrievalService.js';

export const getIngestedDocuments = async (req: Request, res: Response) => {
  try {
    const docs = await KnowledgeDocument.find().select('-chunks');
    return res.json(docs);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const triggerIngestion = async (req: Request, res: Response) => {
  try {
    await ingestGovernmentKnowledgeBase();
    const count = await KnowledgeDocument.countDocuments();
    return res.json({ message: 'RAG Knowledge base ingestion completed', totalDocuments: count });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const searchKnowledgeBase = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'Search query parameter is required' });

    const citations = await searchGovernmentKnowledgeBase(query);
    return res.json({ query, citations });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
