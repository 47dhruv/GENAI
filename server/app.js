import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chat.routes.js';
import chatsRouter from './routes/chats.routes.js';
import authRoutes from './routes/auth.routes.js';
// ...

// Create Express app and apply middleware

const app = express()
const allowedOrigins = [
  'https://genai-vert.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, true);
  },
  credentials: true,
}));


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
