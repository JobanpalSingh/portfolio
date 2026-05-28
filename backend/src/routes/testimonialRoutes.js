import { Router } from 'express';
import {
  listTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { requireAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', listTestimonials);
router.post('/', requireAdmin, upload.single('image'), createTestimonial);
router.put('/:id', requireAdmin, upload.single('image'), updateTestimonial);
router.delete('/:id', requireAdmin, deleteTestimonial);

export default router;
