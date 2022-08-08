import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import { handleError } from './types/errors/handleError';
import { CORS_ORIGIN, PORT } from './utils/constants';

dotenv.config();

const app = express();
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ test: 'test' });
});

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
