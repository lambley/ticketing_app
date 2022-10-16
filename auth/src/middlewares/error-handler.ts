// see "Writing error handlers" https://expressjs.com/en/guide/error-handling.html
import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

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
  // request validation errors
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // database connection errors
  if (err instanceof DatabaseConnectionError) {
    return res.status(err.statusCode).send({ error: err.serializeErrors() });
  }

  // unexpected errors
  res.status(400).send({
    errors: [{ message: 'Unexpected error occurred' }],
  });
};
