import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('returns a 400 for invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'asdasdas',
      password: 'password',
    })
    .expect(400);
});

it('returns a 400 for invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'one',
    })
    .expect(400);
});

it('returns a 400 if no email or password supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com' })
    .expect(400);
  await request(app)
    .post('/api/users/signup')
    .send({ password: 'password' })
    .expect(400);
  await request(app).post('/api/users/signup').send({}).expect(400);
});

// it('returns a 400 if user already exists in database', async () => {
//   return request(app)
//     .post('/api/users/signup')
//     .send({
//       email: 'test@test.com',
//       password: 'password',
//     })
//     .expect(400);
// });
