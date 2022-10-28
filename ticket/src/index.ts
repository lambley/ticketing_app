import mongoose from 'mongoose';
import { JwtNotDefinedError } from '@lambley-ticketing/ticketing-common/build';

import { app } from './app';

// Mongo instance startup function
// Connect to auth-mongo-srv ClusterIP
// address structure mongodb://[service name]:[port]/[database name]
const start = async () => {
  // early type guard check for JWT secret key
  if (!process.env.JWT_KEY) {
    throw new JwtNotDefinedError();
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
