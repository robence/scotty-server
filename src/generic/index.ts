type ErrorMessage = { errorMessage: string };

export default interface ResponseType<T> {
  status: number;
  payload: T | ErrorMessage;
}
