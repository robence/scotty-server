import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { Logger } from '@overnightjs/logger';
import HttpClientError from '../error/http-client-error';

export default function clientErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (error instanceof HttpClientError) {
    // handle service checked exceptions
    Logger.Warn(`${req.path}  Caught ${error.name}.`);
    res.status(error.statusCode).send({ error });
  } else if (error.name === 'ValidationError') {
    // handle mongoose validation failure
    Logger.Warn(`${req.path}  Caught ${error.name}.`);
    res.status(BAD_REQUEST).send({ error });
  } else {
    Logger.Err('Unexpected error.');
    Logger.Err(error.name);
    Logger.Err(error.stack);
    Logger.Err(error.message);

    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: { name: error.name, message: error.message } });
  }
}
