/* eslint-disable */
import { CustomErrorType } from '../types/error';

export default class ValidationError extends Error implements CustomErrorType {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.message = message;
  }

  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        // stacktrace: this.stack,
      },
    };
  }
}
