import { Router } from 'express';
import {
  createService,
  deleteService,
  getService,
  getServices,
  updateService,
} from '../controllers/servicesController';
import { protect } from '../middlewares/auth';

const router = Router();

router.route('/').get(protect, getServices).post(protect, createService);

router.route('/:id').get(protect, getService).put(protect, updateService).delete(protect, deleteService);

export default router;
