import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
// allow ingress-nginx proxy for https connection
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    // disable encryption
    signed: false,
    // require https connections
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Status 404: throw error for Not Found Routes
// Note: would normally need async... next syntax for Express, but doesn't need it here due to express-async-errors module
app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

// Mongo instance startup function
// Connect to auth-mongo-srv ClusterIP
// address structure mongodb://[service name]:[port]/[database name]
const start = async () => {
  // early type guard check for JWT secret key
  if (!process.env.JWT_KEY) {
    throw new Error('JWT must be defined');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('connected to mongodb/auth');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
};

// start service
start();
