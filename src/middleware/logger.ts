import { Request, Response, NextFunction } from 'express';

import { Logger } from '@overnightjs/logger';

const logger = (req: Request, _: Response, next: NextFunction): void => {
  Logger.Info(`${req.url}  ${req.method}`);
  next();
};

export default logger;
