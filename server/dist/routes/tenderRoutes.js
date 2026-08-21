import { Router } from 'express';
import { getTenders, createTender } from '../controllers/tenderController.js';
import { protectRoute } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/', protectRoute, getTenders);
router.post('/', protectRoute, createTender);
export default router;
