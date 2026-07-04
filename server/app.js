import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chat.routes.js';
import chatsRouter from './routes/chats.routes.js';
import authRoutes from './routes/auth.routes.js';
// ...


const allowedOrigins = [
  'https://genai-vert.vercel.app',
  'http://localhost:5173', // your local Vite dev server, adjust port if different
];

// Create Express app and apply middleware
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman/curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true, // only needed if you're sending cookies/auth headers cross-origin
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
