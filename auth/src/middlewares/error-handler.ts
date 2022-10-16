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
    // for each error, change error custom Error
    const formattedErrors = err.errors.map((error) => {
      return {
        message: error.msg,
        field: error.param,
      };
    });
    return res.status(400).send({ errors: formattedErrors });
  }

  // database connection errors
  if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({
      errors: [
        {
          message: err.reason,
        },
      ],
    });
  }

  // unexpected errors
  res.status(400).send({
    errors: [{ message: 'Unexpected error occurred' }],
  });
};
