import express from 'express';
import { googleLogin, getCurrentUser } from '../controllers/authController.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/google', googleLogin);
router.get('/me', protect, getCurrentUser);

export default router;
