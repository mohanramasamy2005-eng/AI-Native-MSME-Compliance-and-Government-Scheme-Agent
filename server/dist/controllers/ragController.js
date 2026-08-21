import { KnowledgeDocument } from '../models/KnowledgeDocument.js';
import { ingestGovernmentKnowledgeBase } from '../services/ragIngestionService.js';
import { searchGovernmentKnowledgeBase } from '../services/ragRetrievalService.js';
export const getIngestedDocuments = async (req, res) => {
    try {
        const docs = await KnowledgeDocument.find().select('-chunks');
        return res.json(docs);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
export const triggerIngestion = async (req, res) => {
    try {
        await ingestGovernmentKnowledgeBase();
        const count = await KnowledgeDocument.countDocuments();
        return res.json({ message: 'RAG Knowledge base ingestion completed', totalDocuments: count });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
export const searchKnowledgeBase = async (req, res) => {
    try {
        const { query } = req.body;
        if (!query)
            return res.status(400).json({ error: 'Search query parameter is required' });
        const citations = await searchGovernmentKnowledgeBase(query);
        return res.json({ query, citations });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
