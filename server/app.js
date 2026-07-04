import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chat.routes.js';
import chatsRouter from './routes/chats.routes.js';
import authRoutes from './routes/auth.routes.js';
// ...

// Create Express app and apply middleware
const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/chats', chatsRouter);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Server healthy' });
});

export default app;
