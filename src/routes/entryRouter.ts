import { Router } from 'express';
import { createEntry, getEntries, getEntry } from '../controllers/entriesController';

const router = Router();

router.route('/').get(getEntries).post(createEntry);

router.route('/:id').get(getEntry);

export default router;
