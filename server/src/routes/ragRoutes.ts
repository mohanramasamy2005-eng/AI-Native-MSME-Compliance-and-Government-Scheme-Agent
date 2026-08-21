import { Router } from 'express';
import {
  getIngestedDocuments,
  triggerIngestion,
  searchKnowledgeBase,
} from '../controllers/ragController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/documents', protectRoute as any, getIngestedDocuments);
router.post('/ingest', protectRoute as any, triggerIngestion);
router.post('/search', protectRoute as any, searchKnowledgeBase);

export default router;
