export type ErrorType = {
  name: string;
  message: string;
  statusCode: number;
};

export type ErrorResponse = { error: ErrorType };
