// abstract class for our custom error subclasses
// implenting this to minimise duplicated code in error-handler middleware
export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // define method signature for returned error message
  abstract serializeErrors(): { message: string; field?: string }[];
}
