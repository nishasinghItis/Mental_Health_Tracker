import express from 'express';
import { createMoodEntry, getAllMoods } from '../controllers/moodController.js';
import { protect } from '../middleware/authMiddleware.js'; // ✅ Correct named import

const router = express.Router();

// ✅ Use protect as middleware
router.post('/', protect, createMoodEntry);
router.get('/', protect, getAllMoods);

export default router;
