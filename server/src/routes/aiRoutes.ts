import { Router } from 'express';
import { handleAiChat } from '../controllers/aiController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/chat', protectRoute as any, handleAiChat);

export default router;
