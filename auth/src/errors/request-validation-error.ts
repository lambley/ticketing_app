import { ValidationError } from 'express-validator';

// subclass of Error to check requests
export class RequestValidationError extends Error {
  // constructor - always has an array of errors
  constructor(public errors: ValidationError[]) {
    // construct with Error fields
    super();

    // Needed as extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
