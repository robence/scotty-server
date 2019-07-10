import { ErrorMessage, CustomErrorAsJSON } from './error';

export interface ResponseType<T> {
  status: number;
  payload: T | ErrorMessage;
}

export interface ResponseTypeWithCustomError {
  status: number;
  payload: CustomErrorAsJSON;
}
