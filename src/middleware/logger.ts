import { Request, Response, NextFunction } from 'express';

const logger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  /* eslint-disable no-console */
  console.log('LOGGED');
  console.log(`${req.method} ${req.path}`);
  console.log('LOGGED2');
  /* eslint-enable no-console */
  next();
};

const LoggerMiddleware = (req, res, next) => {
  console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`);
  next();
};

export default LoggerMiddleware;
