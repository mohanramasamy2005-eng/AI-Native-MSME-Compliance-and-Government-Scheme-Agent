import { Router } from 'express';
import { getDeadlines, createDeadline } from '../controllers/deadlineController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protectRoute as any, getDeadlines);
router.post('/', protectRoute as any, createDeadline);

export default router;
