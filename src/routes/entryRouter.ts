import { Router } from 'express';
import { createEntry, deleteEntry, getEntries, getEntry, updateEntry } from '../controllers/entriesController';

const router = Router();

router.route('/').get(getEntries).post(createEntry);

router.route('/:id').get(getEntry).put(updateEntry).delete(deleteEntry);

export default router;
