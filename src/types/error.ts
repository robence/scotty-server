export type ErrorMessage = { errorMessage: object };

export interface CustomErrorType extends Error {
  name: string;
  message: string;

  toJSON(): CustomErrorAsJSON;
}

export type CustomErrorAsJSON = {
  error: {
    name: string;
    message: string;
  };
};
