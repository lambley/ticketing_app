// tests for creating new tickets
import { RequestValidationError } from '@lambley-ticketing/ticketing-common/build';
import request from 'supertest';
import { app } from '../../app';

it('has a route handler listening to /api/tickets for post requests', async () => {
  const res = await request(app).post('/api/ticket').send({});

  expect(res.status).not.toEqual(404);
});

it('can only be accessed if user is signed in', async () => {
  // check for authentication - the below is the same as not being signed in
  await request(app).post('/api/ticket').send({}).expect(401);
});

it('returns an error if invalid title is provided', async () => {
  const res = await request(app).post('/api/ticket').send({});
});

it('returns an error if an invalid price is provided', async () => {
  const res = await request(app).post('/api/ticket').send({});
});

it('creates a ticket when supplied valid inputs', async () => {
  const res = await request(app).post('/api/ticket').send({});
});
