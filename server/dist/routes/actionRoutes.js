import { Router } from 'express';
import { getActionItems, createActionItem, updateActionItemStatus, } from '../controllers/actionController.js';
import { protectRoute } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/', protectRoute, getActionItems);
router.post('/', protectRoute, createActionItem);
router.put('/:id', protectRoute, updateActionItemStatus);
export default router;
