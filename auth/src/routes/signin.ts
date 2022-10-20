import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password must be present'),
  ],
  (req: Request, res: Response) => {
    // check if user exists, if not throw error
    const errors = validationResult(req);

    if (!errors.isEmpty) {
      throw new RequestValidationError(errors.array());
    }
    // compare password hashes
    // create JWT
  }
);

export { router as signinRouter };
