import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  shortName: String,
  logo: String,
  captain: String,
  coach: String,
  homeVenue: String,
  championships: Number,
  recentPerformance: {
    last5Matches: [String],
    currentForm: String,
  },
  keyPlayers: [String],
}, {
  timestamps: true,
});

export default mongoose.model('Team', teamSchema);