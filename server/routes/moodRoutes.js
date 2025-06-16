// routes/moodRoutes.js
import express from 'express';
import { createMood, getUserMoods } from '../controllers/moodController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createMood);
router.get('/', authMiddleware, getUserMoods);

export default router;
