import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import axios from 'axios';
import { config } from './config.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/me', async (req, res) => {
  const timestamp = new Date().toISOString();
  let fact;

  try {
    const response = await axios.get(config.catFact.url, { timeout: config.catFact.timeout });
    fact = typeof response.data.fact === 'string'
      ? response.data.fact
      : 'No cat fact available at the moment.';
  } catch (error) {
    console.error('Cat Facts API error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
    });
    fact = 'Unable to fetch cat fact right now. Please try again later.';
  }

  res.status(200).json({
    status: 'success', 
    user: config.user,
    timestamp,
    fact
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Request Not Found' });
});

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
