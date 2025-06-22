import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/authRoutes.js';
import moodRoutes from './routes/moodRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import consultationRoutes from './routes/consultationRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/consultation', consultationRoutes);

// Debug: Environment key check (Optional)
console.log("✅ Loaded Openrouter Key:", process.env.OPENROUTER_API_KEY);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(5000, () => {
    console.log('🚀 Server running at http://localhost:5000');
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
