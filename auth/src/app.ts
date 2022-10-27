import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

import {
  errorHandler,
  NotFoundError,
} from '@lambley-ticketing/ticketing-common/build';

const app = express();
// allow ingress-nginx proxy for https connection
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    // disable encryption
    signed: false,
    // require https connections - check environment is 'test', if not, set to true
    secure: process.env.NODE_ENV !== 'test',
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

export { app };
