import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Prediction from '../models/Prediction.js';
import Team from '../models/Team.js';

dotenv.config();

const samplePredictions = [
  {
    matchTitle: "CSK vs MI - IPL 2024",
    team1: { name: "Chennai Super Kings", shortName: "CSK", recentForm: ["W", "W", "L", "W", "W"] },
    team2: { name: "Mumbai Indians", shortName: "MI", recentForm: ["L", "W", "L", "W", "L"] },
    matchDate: new Date(Date.now() + 86400000),
    matchTime: "7:30 PM IST",
    venue: "MA Chidambaram Stadium, Chennai",
    tossPrediction: {
      team: "Chennai Super Kings",
      probability: 65,
      analysis: "CSK has won 60% of tosses at this venue in last 3 seasons."
    },
    matchInsight: {
      summary: "CSK holds a strong home record against MI.",
      winProbability: { team1: 55, team2: 45 },
      keyFactors: ["Home advantage", "Spin bowling depth"]
    },
    weather: {
      condition: "Clear sky",
      temperature: "32°C",
      humidity: "65%",
      impact: "No impact expected"
    },
    pitchReport: {
      condition: "Spin-friendly",
      battingFriendly: true,
      bowlingFriendly: true,
      averageScore: 165
    },
    headToHead: { totalMatches: 37, team1Wins: 16, team2Wins: 21 }
  }
];

const sampleTeams = [
  { name: "Chennai Super Kings", shortName: "CSK", championships: 5, captain: "MS Dhoni", homeVenue: "Chepauk" },
  { name: "Mumbai Indians", shortName: "MI", championships: 5, captain: "Rohit Sharma", homeVenue: "Wankhede" },
  { name: "Royal Challengers Bangalore", shortName: "RCB", championships: 0, captain: "Faf du Plessis", homeVenue: "Chinnaswamy" },
  { name: "Kolkata Knight Riders", shortName: "KKR", championships: 2, captain: "Shreyas Iyer", homeVenue: "Eden Gardens" },
  { name: "Delhi Capitals", shortName: "DC", championships: 0, captain: "David Warner", homeVenue: "Arun Jaitley" },
  { name: "Rajasthan Royals", shortName: "RR", championships: 1, captain: "Sanju Samson", homeVenue: "Sawai Mansingh" },
  { name: "Sunrisers Hyderabad", shortName: "SRH", championships: 1, captain: "Aiden Markram", homeVenue: "Rajiv Gandhi" },
  { name: "Lucknow Super Giants", shortName: "LSG", championships: 0, captain: "KL Rahul", homeVenue: "BRSABV" },
  { name: "Gujarat Titans", shortName: "GT", championships: 1, captain: "Hardik Pandya", homeVenue: "Narendra Modi" },
  { name: "Punjab Kings", shortName: "PBKS", championships: 0, captain: "Shikhar Dhawan", homeVenue: "Punjab Cricket Stadium" }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Prediction.deleteMany();
    await Team.deleteMany();
    await Prediction.insertMany(samplePredictions);
    await Team.insertMany(sampleTeams);
    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();