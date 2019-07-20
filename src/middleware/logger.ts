import { Request, Response, NextFunction } from 'express';

import log from '../utils/log';

const logger = (req: Request, _: Response, next: NextFunction): void => {
  log.info(`${req.url}  ${req.method}`);
  next();
};

export default logger;
