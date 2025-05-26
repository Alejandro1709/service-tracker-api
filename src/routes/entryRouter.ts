import { Router } from 'express';
import { createEntry, deleteEntry, getEntries, getEntry, updateEntry } from '../controllers/entriesController';
import { protect } from '../middlewares/auth';

const router = Router();

router.route('/').get(protect, getEntries).post(protect, createEntry);

router.route('/:id').get(protect, getEntry).put(protect, updateEntry).delete(protect, deleteEntry);

export default router;
