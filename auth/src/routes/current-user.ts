import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  // if no session or no JWT set
  // .session? checks if session exists as well - equivalent to an || check
  if (!req.session?.jwt) {
    // send response: no current user
    return res.send({ currentUser: null });
  }

  try {
    // decode JWT data - pass JWT and secret key
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    // send user email and id
    res.send({ currentUser: payload });
  } catch (error) {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
