import { Router } from 'express';
import { getBusinessProfile, updateBusinessProfile } from '../controllers/businessController.js';
import { protectRoute } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/', protectRoute, getBusinessProfile);
router.put('/', protectRoute, updateBusinessProfile);
export default router;
