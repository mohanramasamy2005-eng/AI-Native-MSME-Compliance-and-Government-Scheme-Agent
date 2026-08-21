import { Router } from 'express';
import { getTenders, createTender } from '../controllers/tenderController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protectRoute as any, getTenders);
router.post('/', protectRoute as any, createTender);

export default router;
