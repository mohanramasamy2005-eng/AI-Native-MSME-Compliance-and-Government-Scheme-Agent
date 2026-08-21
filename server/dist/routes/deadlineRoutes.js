import { Router } from 'express';
import { getDeadlines, createDeadline } from '../controllers/deadlineController.js';
import { protectRoute } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/', protectRoute, getDeadlines);
router.post('/', protectRoute, createDeadline);
export default router;
