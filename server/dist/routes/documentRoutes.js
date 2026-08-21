import { Router } from 'express';
import multer from 'multer';
import { getDocuments, uploadDocumentMetadata } from '../controllers/documentController.js';
import { protectRoute } from '../middleware/authMiddleware.js';
const upload = multer({ dest: 'uploads/' });
const router = Router();
router.get('/', protectRoute, getDocuments);
router.post('/upload', protectRoute, upload.single('file'), uploadDocumentMetadata);
export default router;
