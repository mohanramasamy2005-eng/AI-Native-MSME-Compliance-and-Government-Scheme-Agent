import { Router } from 'express';
import {
  getCertifications,
  createCertification,
  updateCertification,
} from '../controllers/certificationController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protectRoute as any, getCertifications);
router.post('/', protectRoute as any, createCertification);
router.put('/:id', protectRoute as any, updateCertification);

export default router;
