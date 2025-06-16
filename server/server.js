import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import moodRoutes from './routes/moodRoutes.js';

dotenv.config();

const app = express(); // ✅ Make sure this comes BEFORE any app.use

app.use(cors());
app.use(express.json());

// ✅ Define routes after app is created
app.use('/api/auth', authRoutes);
app.use('/api/moods', moodRoutes);

// ✅ DB & Server connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(5000, () => {
      console.log('🚀 Server running on http://localhost:5000');
    });
  })
  .catch((err) => console.error('MongoDB error:', err));
