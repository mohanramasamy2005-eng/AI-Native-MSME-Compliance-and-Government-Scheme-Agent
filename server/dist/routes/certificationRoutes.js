import { Router } from 'express';
import { getCertifications, createCertification, updateCertification, } from '../controllers/certificationController.js';
import { protectRoute } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/', protectRoute, getCertifications);
router.post('/', protectRoute, createCertification);
router.put('/:id', protectRoute, updateCertification);
export default router;
