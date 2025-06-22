// server/routes/aiRoutes.js
import express from 'express';
import { handleAIChat } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/chat', protect, handleAIChat);

export default router;
