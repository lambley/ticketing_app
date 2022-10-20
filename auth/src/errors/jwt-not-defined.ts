import { CustomError } from './custom-error';

export class JwtNotDefinedError extends CustomError {
  statusCode: number = 403;

  constructor() {
    super('Error: JWT not defined');

    Object.setPrototypeOf(this, JwtNotDefinedError);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: 'JWT not defined',
      },
    ];
  }
}
