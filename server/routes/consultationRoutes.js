// server/routes/consultationRoutes.js
import express from 'express';
import { getTherapists } from '../controllers/consultationController.js';

const router = express.Router();

router.get('/', getTherapists);

export default router;
