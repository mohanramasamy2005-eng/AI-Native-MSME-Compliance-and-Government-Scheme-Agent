import { Router } from 'express';
import { getCompliances, createCompliance, updateCompliance, deleteCompliance, } from '../controllers/complianceController.js';
import { protectRoute } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/', protectRoute, getCompliances);
router.post('/', protectRoute, createCompliance);
router.put('/:id', protectRoute, updateCompliance);
router.delete('/:id', protectRoute, deleteCompliance);
export default router;
