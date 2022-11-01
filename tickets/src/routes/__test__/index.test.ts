// tests for showing all tickets
import request from 'supertest';
import { app } from '../../app';

const createTicket = () => {
  const title = 'test ticket';
  const price = 20;
  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price,
    })
    .expect(201);
};

it('can fetch a list of tickets', async () => {
  // create three tickets
  await createTicket().expect(201);
  await createTicket().expect(201);
  await createTicket().expect(201);

  const res = await request(app).get('/api/tickets').send().expect(200);

  expect(res.body.length).toEqual(3);
});
