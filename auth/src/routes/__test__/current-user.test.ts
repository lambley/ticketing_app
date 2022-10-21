import request from 'supertest';
import { app } from '../../app';

it('responds with details on current signed in user', async () => {
  const userEmail = 'test@test.com';
  const authRes = await request(app)
    .post('/api/users/signup')
    .send({
      email: userEmail,
      password: 'password',
    })
    .expect(201);
  const cookie = authRes.get('Set-Cookie');

  const res = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
    
  expect(res.body.currentUser.email).toEqual(userEmail);
});
