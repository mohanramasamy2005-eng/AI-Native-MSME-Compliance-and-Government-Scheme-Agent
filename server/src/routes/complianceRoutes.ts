import { Router } from 'express';
import {
  getCompliances,
  createCompliance,
  updateCompliance,
  deleteCompliance,
} from '../controllers/complianceController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protectRoute as any, getCompliances);
router.post('/', protectRoute as any, createCompliance);
router.put('/:id', protectRoute as any, updateCompliance);
router.delete('/:id', protectRoute as any, deleteCompliance);

export default router;
