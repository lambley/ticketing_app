// tests for showing a ticket
import request from 'supertest';
import { app } from '../../app';

it('should return a 404 if ticket is not found', async () => {
  await request(app).get('/api/tickets/some_id').send().expect(404);
});

it('should return a ticket if ticket is found', async () => {
  const title = 'test ticket';
  const price = 20;

  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price,
    })
    .expect(201);

  const ticketRes = await request(app)
    .get(`/api/tickets/${res.body.id}`)
    .send()
    .expect(200);

  expect(ticketRes.body.title).toEqual(title);
  expect(ticketRes.body.price).toEqual(price);
});
