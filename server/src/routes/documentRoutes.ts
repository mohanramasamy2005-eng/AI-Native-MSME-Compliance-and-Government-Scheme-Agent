import { Router } from 'express';
import multer from 'multer';
import { getDocuments, uploadDocumentMetadata } from '../controllers/documentController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.get('/', protectRoute as any, getDocuments);
router.post('/upload', protectRoute as any, upload.single('file'), uploadDocumentMetadata);

export default router;
