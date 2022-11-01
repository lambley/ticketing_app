import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';

// global function type annotation
declare global {
  var signin: () => string[];
}

let mongo: any;
// run before all tests are executed - create mongoDB in memory
beforeAll(async () => {
  process.env.JWT_KEY = 'secretkeyhere';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

// reset data between tests
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

// disconnect after testing
afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

// create global signup function to use for testing, that fakes jwt data in a cookie
global.signin = () => {
  // build a jwt payload { id, email }
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // create the jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build session object { jwt: MY_JWT }
  const session = { jwt: token };

  // transform session into json
  const sessionJSON = JSON.stringify(session);

  // encode json as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return cookie with encoded data
  return [`session=${base64}`];
};
