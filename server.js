import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import predictionRoutes from './routes/predictionRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Your API routes
app.use('/api/predictions', predictionRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);

// ✅ PROXY ROUTE – fetches SportScore HTML server‑side (no CORS)
app.get('/api/sportscore-proxy', async (req, res) => {
  try {
    // Use fetch (Node 18+). For older Node, install node-fetch.
    const response = await fetch('https://sportscore.com/embed/fixtures/cricket/competition/indian-premier-league/');
    const html = await response.text();
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch SportScore data' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));