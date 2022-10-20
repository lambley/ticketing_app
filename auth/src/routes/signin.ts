import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../helpers/password';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password must be present'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid login credentials');
    }

    // validate hashed password
    const passwordsMatch: boolean = await Password.compare(
      existingUser.password,
      password
    );

    // throw error if no match
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid login credentials');
    }

    // generate JWT (sync)
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      // force typescript to accept JWT_KEY has been defined - see index.ts
      // get JWT_KEY from k8s auth-depl
      process.env.JWT_KEY!
    );

    // store it on the session object
    req.session = {
      jwt: userJwt,
    };

    // send User created status
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
