import { Router } from 'express';
import { getSchemes, createScheme } from '../controllers/schemeController.js';
import { protectRoute } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/', protectRoute, getSchemes);
router.post('/', protectRoute, createScheme);
export default router;
