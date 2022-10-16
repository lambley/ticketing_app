import { ValidationError } from 'express-validator';

// subclass of Error for database connection errors
export class DatabaseConnectionError extends Error {
  statusCode = 500;
  reason = 'Error connecting to database';

  constructor() {
    // construct with Error fields
    super();

    // Needed as extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
