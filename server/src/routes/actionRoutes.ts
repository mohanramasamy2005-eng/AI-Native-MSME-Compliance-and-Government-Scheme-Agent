import { Router } from 'express';
import {
  getActionItems,
  createActionItem,
  updateActionItemStatus,
} from '../controllers/actionController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protectRoute as any, getActionItems);
router.post('/', protectRoute as any, createActionItem);
router.put('/:id', protectRoute as any, updateActionItemStatus);

export default router;
