import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import HttpClientError from '../error/http-client-error';
import log from '../utils/log';

export default function clientErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  log.info('CLIENT ERROR HANDLER');

  if (error instanceof HttpClientError) {
    res.status(error.statusCode).send({ error });
  } else if (error.name === 'ValidationError') {
    // handle mongoose validation failure
    log.err('MONGO VALIDATION FAILED');
    res.status(BAD_REQUEST).send({ error });
  } else {
    log.err('UNHANDLER ERROR');
    console.log(error);
    next(error);
  }
}
