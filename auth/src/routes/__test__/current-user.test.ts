import request from 'supertest';
import { app } from '../../app';

it('responds with details on current signed in user', async () => {
  const cookie = await global.signup();

  const res = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(res.body.currentUser.email).toEqual(testEmail);
});
