type ErrorMessage = { errorMessage: string };

export default interface IResponse<T> {
  status: number;
  payload: T | ErrorMessage;
}
