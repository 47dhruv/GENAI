import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import {
    createChat,
    listChats,
    getChat,
    postMessageToChat,
} from '../controllers/chatController.js';

const router = express.Router();

router.use(protect); // all routes below require a valid JWT

router.post('/', createChat);
router.get('/', listChats);
router.get('/:id', getChat);
router.post('/:id/messages', postMessageToChat);

export default router;