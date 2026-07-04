import express from 'express';
import { postChat } from '../controllers/chatController.js';

const router = express.Router();

// POST /api/chat
router.post('/', postChat);

export default router;