import express from 'express';
import { getPredictions, getTodaysPrediction, getPredictionById } from '../controllers/predictionController.js';

const router = express.Router();

router.get('/', getPredictions);
router.get('/today', getTodaysPrediction);
router.get('/:id', getPredictionById);

export default router;