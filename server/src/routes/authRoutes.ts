import { Router } from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protectRoute as any, getMe);

export default router;
