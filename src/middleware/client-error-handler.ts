import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import { Logger } from '@overnightjs/logger';
import HttpClientError from '../error/http-client-error';

export default function clientErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (error instanceof HttpClientError) {
    Logger.Warn(`Caught ${error.name}.`);
    res.status(error.statusCode).send({ error });
  } else if (error.name === 'ValidationError') {
    // handle mongoose validation failure
    Logger.Warn(`Caught ${error.name}.`);
    res.status(BAD_REQUEST).send({ error });
  } else {
    next(error);
  }
}
