import { ValidationError } from 'express-validator';

// subclass of Error to check requests
export class RequestValidationError extends Error {
  statusCode = 400;
  // constructor - always has an array of errors
  constructor(public errors: ValidationError[]) {
    // construct with Error fields
    super();

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
