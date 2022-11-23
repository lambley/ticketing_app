import mongoose from 'mongoose';
import { JwtNotDefinedError } from '@lambley-ticketing/ticketing-common/build';
import { natsWrapper } from './nats-wrapper';

import { app } from './app';

// Mongo instance startup function
// Connect to auth-mongo-srv ClusterIP
// address structure mongodb://[service name]:[port]/[database name]
const start = async () => {
  // early type guard check for JWT secret key
  if (!process.env.JWT_KEY) {
    throw new JwtNotDefinedError();
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }

  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }
  // connect to MongoDB and NATS
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    // graceful NATS shutdown
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    // connect to mongo db
    await mongoose.connect(process.env.MONGO_URI);
    console.log('connected to mongodb/ticket');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
};

// start service
start();
