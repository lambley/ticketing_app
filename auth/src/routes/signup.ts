import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // check if User already exists and return early if finds user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email already exists');
    }

    // create user and save to database
    const user = User.build({ email, password });
    await user.save();

    // generate JWT (sync)
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
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
    res.status(201).send(user);
  }
);

export { router as signupRouter };
