import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

// modify Request interface with (optional) currentUser property
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if no session or no JWT set
  if (!req.session?.jwt) {
    return next();
  }

  try {
    // decode JWT data - pass JWT and secret key
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    // add payload to req
    req.currentUser = payload;
  } catch (error) {}

  next();
};
