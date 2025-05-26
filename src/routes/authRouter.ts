import { Router } from 'express';
import { getAuthUser, login, register } from '../controllers/authController';
import { protect } from '../middlewares/auth';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.get('/user', protect, getAuthUser);

export default router;
