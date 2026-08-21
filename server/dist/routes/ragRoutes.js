import { Router } from 'express';
import { getIngestedDocuments, triggerIngestion, searchKnowledgeBase, } from '../controllers/ragController.js';
import { protectRoute } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/documents', protectRoute, getIngestedDocuments);
router.post('/ingest', protectRoute, triggerIngestion);
router.post('/search', protectRoute, searchKnowledgeBase);
export default router;
