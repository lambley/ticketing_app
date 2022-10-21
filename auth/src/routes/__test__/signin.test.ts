import request from 'supertest';
import { app } from '../../app';

it('returns 400 if email is invalid', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'email',
      password: 'password',
    })
    .expect(400);
});

it('returns 400 if password is not present', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '',
    })
    .expect(400);
});

it('returns 400 if email has not signed up before', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test1@test.com',
      password: 'password',
    })
    .expect(400);
});

it('returns 400 if user exists and password is incorrect', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'test',
    })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const res = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);
  expect(res.get('Set-Cookie')).toBeDefined;
});
