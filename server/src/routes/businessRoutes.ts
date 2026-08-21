import { Router } from 'express';
import { getBusinessProfile, updateBusinessProfile } from '../controllers/businessController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protectRoute as any, getBusinessProfile);
router.put('/', protectRoute as any, updateBusinessProfile);

export default router;
