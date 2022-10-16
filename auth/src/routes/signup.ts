import express from 'express';

const router = express.Router();

router.post('/api/users/signup', (req, res) => {
  res.send('current user route');
});

export { router as signupRouter };
