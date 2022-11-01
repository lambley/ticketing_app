// tests for showing all tickets
import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns 404 if id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({ title: 'title', price: 20 })
    .expect(404);
});

it('returns 401 if user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: 'title', price: 20 })
    .expect(401);
});

it('returns 401 if user does not own ticket', async () => {
  const originalTitle = 'test';
  const originalPrice = 20;

  const res = await request(app)
    .post('/api/ticket')
    .set('Cookie', global.signin())
    .send({
      title: originalTitle,
      price: originalPrice,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${res.body.ticket.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'test2',
      price: '30',
    })
    .expect(401);

  expect(res.body.ticket.title).toEqual(originalTitle);
  expect(res.body.ticket.price).toEqual(originalPrice);
});

it('returns 401 if user does provide valid title or price', async () => {});

it('updates the ticket provided valid inputs', async () => {});
