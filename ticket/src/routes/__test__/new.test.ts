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

it('returns a status other than 401 if user is signed in', async () => {
  const res = await request(app)
    .post('/api/ticket')
    .set('Cookie', global.signin())
    .send();

  expect(res.status).not.toEqual(401);
});

it('returns an error if invalid title is provided', async () => {
  await request(app)
    .post('/api/ticket')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 10,
    })
    .expect(400);

  await request(app)
    .post('/api/ticket')
    .set('Cookie', global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
  await request(app)
  .post('/api/ticket')
  .set('Cookie', global.signin())
  .send({
    title: 'test ticket',
    price: -10,
  })
  .expect(400);

  await request(app)
  .post('/api/ticket')
  .set('Cookie', global.signin())
  .send({
    title: 'test ticket',
  })
  .expect(400);
});

it('creates a ticket when supplied valid inputs', async () => {
  const res = await request(app).post('/api/ticket').send({});
});
