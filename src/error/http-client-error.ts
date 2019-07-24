import { ErrorType } from '../types/error';

export default abstract class HTTPClientError extends Error {
  readonly statusCode!: number;

  readonly name!: string;

  readonly message!: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(): ErrorType {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
