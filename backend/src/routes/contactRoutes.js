import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { submitContact, listContacts } from '../controllers/contactController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

const publicLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', publicLimiter, submitContact);
router.get('/', requireAdmin, listContacts);

export default router;
