import Prediction from '../models/Prediction.js';

// @desc    Get all active predictions
// @route   GET /api/predictions
export const getPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find({ isActive: true }).sort({ matchDate: 1 });
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get today's prediction
// @route   GET /api/predictions/today
export const getTodaysPrediction = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const prediction = await Prediction.findOne({
      matchDate: { $gte: today, $lt: tomorrow },
      isActive: true,
    });

    if (!prediction) {
      return res.status(404).json({ message: 'No prediction available for today' });
    }
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get prediction by ID
// @route   GET /api/predictions/:id
export const getPredictionById = async (req, res) => {
  try {
    const prediction = await Prediction.findById(req.params.id);
    if (!prediction) return res.status(404).json({ message: 'Prediction not found' });
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};