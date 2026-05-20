import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema({
  matchTitle: {
    type: String,
    required: true,
  },
  team1: {
    name: String,
    shortName: String,
    recentForm: [String],
  },
  team2: {
    name: String,
    shortName: String,
    recentForm: [String],
  },
  matchDate: {
    type: Date,
    required: true,
  },
  matchTime: String,
  venue: String,
  tossPrediction: {
    team: String,
    probability: Number,
    analysis: String,
  },
  matchInsight: {
    summary: String,
    winProbability: {
      team1: Number,
      team2: Number,
    },
    keyFactors: [String],
  },
  weather: {
    condition: String,
    temperature: String,
    humidity: String,
    impact: String,
  },
  pitchReport: {
    condition: String,
    battingFriendly: Boolean,
    bowlingFriendly: Boolean,
    averageScore: Number,
  },
  headToHead: {
    totalMatches: Number,
    team1Wins: Number,
    team2Wins: Number,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Prediction', predictionSchema);