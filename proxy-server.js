import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

// A simple in-memory cache
const cache = new Map();

app.get('/api/cricket/matches', async (req, res) => {
  // Check cache first
  if (cache.has('matches')) {
    console.log('Serving from cache');
    return res.json(cache.get('matches'));
  }

  try {
    const response = await axios.get('https://sportscore.com/embed/fixtures/cricket/competition/indian-premier-league/', {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // Store key in .env file
        'X-RapidAPI-Host': 'cricket-highlights-api.p.rapidapi.com'
      }
    });
    
    // Cache the response for, say, 5 minutes (300,000 ms)
    cache.set('matches', response.data);
    setTimeout(() => cache.delete('matches'), 300000);
    
    res.json(response.data);
  } catch (error) {
    console.error('Proxy Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from the cricket API.' });
  }
});

app.listen(5001, () => console.log('Proxy server running on port 5001'));