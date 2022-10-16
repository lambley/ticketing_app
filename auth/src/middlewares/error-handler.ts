// see "Writing error handlers" https://expressjs.com/en/guide/error-handling.html
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

// custom Error object (array of objects)
// errors: {
//   message: string,
//   field?: string
// } []
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check for CustomError
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // unexpected errors
  res.status(400).send({
    errors: [{ message: 'Unexpected error occurred' }],
  });
};
