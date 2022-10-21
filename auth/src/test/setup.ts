import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

declare global {
  var signup: () => Promise<string[]>;
  var testEmail: string
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

// create global signup function to use for testing
global.testEmail = 'test@test.com'
global.signup = async () => {
  const email = testEmail;
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
