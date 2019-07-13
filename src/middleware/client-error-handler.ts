import HttpClientError from '../error/http-client-error';

const clientErrorHandler = (err, req, res, next): void => {
  if (err instanceof HttpClientError) {
    res.status(err.statusCode).send(err.message);
  } else {
    next(err);
  }
};

export default clientErrorHandler;
