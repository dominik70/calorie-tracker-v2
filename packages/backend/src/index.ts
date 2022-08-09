import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import { handleError } from './errors/handleError';
import { PrismaClient } from '@prisma/client';
import {
  PORT,
  SESSION_NAME,
  SESSION_SECRET,
  CORS_ORIGIN,
  IS_PRODUCTION,
} from './utils/constants';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { authRouter } from './modules/auth/auth-routes';
import { usersRouter } from './modules/users/users-router';

dotenv.config();

const app = express();

app.use(
  session({
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: IS_PRODUCTION,
    },
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());

app.use('/api/sessions', authRouter);
app.use('/api/users', usersRouter);

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
