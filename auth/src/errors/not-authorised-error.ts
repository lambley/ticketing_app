import { CustomError } from './custom-error';

export class NotAuthorisedError extends CustomError {
  // not authorised
  statusCode: number = 401;

  constructor() {
    super('Not authorised');

    Object.setPrototypeOf(this, NotAuthorisedError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: 'Not authorised',
      },
    ];
  }
}
