import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

// subclass of Error to check requests
export class RequestValidationError extends CustomError {
  statusCode = 400;
  // constructor - always has an array of errors
  constructor(public errors: ValidationError[]) {
    // construct with Error fields
    super('Error: Invalid request parameters');

    // Needed as extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return {
        message: err.msg,
        field: err.param,
      };
    });
  }
}
