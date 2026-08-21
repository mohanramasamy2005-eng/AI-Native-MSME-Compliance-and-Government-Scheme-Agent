import { Router } from 'express';
import { handleAiChat } from '../controllers/aiController.js';
import { protectRoute } from '../middleware/authMiddleware.js';
const router = Router();
router.post('/chat', protectRoute, handleAiChat);
export default router;
