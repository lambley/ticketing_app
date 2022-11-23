// tests for showing all tickets
import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

jest.mock('../../nats-wrapper');

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
    .post('/api/tickets')
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

it('returns 401 if user does provide valid title or price', async () => {
  const originalTitle = 'test';
  const originalPrice = 20;
  const originalUserCookie = global.signin();

  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', originalUserCookie)
    .send({
      title: originalTitle,
      price: originalPrice,
    })
    .expect(201);

  // check that invalid title is being rejected
  await request(app)
    .put(`/api/tickets/${res.body.ticket.id}`)
    .set('Cookie', originalUserCookie)
    .send({
      title: '',
      price: 20,
    })
    .expect(400);

  // check that invalid price is being rejected
  await request(app)
    .put(`/api/tickets/${res.body.ticket.id}`)
    .set('Cookie', originalUserCookie)
    .send({
      title: 'update',
      price: -10,
    })
    .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
  const originalTitle = 'test';
  const originalPrice = 20;
  const originalUserCookie = global.signin();

  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', originalUserCookie)
    .send({
      title: originalTitle,
      price: originalPrice,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${res.body.ticket.id}`)
    .set('Cookie', originalUserCookie)
    .send({
      title: 'updated title',
      price: 200,
    })
    .expect(200);

  const ticketRes = await request(app)
    .get(`/api/tickets/${res.body.ticket.id}`)
    .send();

  expect(ticketRes.body.title).toEqual('updated title');
  expect(ticketRes.body.price).toEqual(200);
});
