import express from 'express';
import { updateProfileImage } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/profile-image', protect, updateProfileImage);

export default router;
