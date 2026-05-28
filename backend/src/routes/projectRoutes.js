import { Router } from 'express';
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { requireAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const projectUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'gallery', maxCount: 24 },
]);

const router = Router();

router.get('/', listProjects);
router.get('/:id', getProject);
router.post('/', requireAdmin, projectUpload, createProject);
router.put('/:id', requireAdmin, projectUpload, updateProject);
router.delete('/:id', requireAdmin, deleteProject);

export default router;
