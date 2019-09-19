import { ErrorResponse } from './error';

export default interface ResponseType<T> {
  status: number;
  payload: T | ErrorResponse;
}
