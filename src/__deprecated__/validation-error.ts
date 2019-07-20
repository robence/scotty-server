/**
 * [DEPRECATED]
 * Example of writing custom Error type
 */

/* eslint-disable */
export default class NamedError extends Error {
  status: number;
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
        status: this.status,
      },
    };
  }
}
