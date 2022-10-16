import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

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
  (req: Request, res: Response) => {
    // check for validation errors
    const errors = validationResult(req);

    // if errors are present
    if (!errors.isEmpty()) {
      // change to throwing an error for error handling middleware to handle in index.ts - string in Error() is the message property
      throw new Error('Invalid email or password');
    }

    const { email, password } = req.body;

    console.log('Creating a user...');

    res.send({});
  }
);

export { router as signupRouter };
