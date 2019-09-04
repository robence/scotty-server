export interface ErrorType {
  name: string;
  message: string;
  statusCode: number;
}

export interface ErrorResponse {
  error: ErrorType;
}
