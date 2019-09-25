import { Request, Response, NextFunction } from 'express';

import { Logger } from '@overnightjs/logger';

const logger = (req: Request, _: Response, next: NextFunction): void => {
  Logger.Info(`${req.url}  ${req.method}`);
  if (Object.keys(req.body).length) {
    Logger.Info('BODY: ');
    if (req.body.password) {
      const body = { ...req.body, password: '****' };
      Logger.Info(JSON.stringify(body));
    } else {
      Logger.Info(JSON.stringify(req.body));
    }
  }
  next();
};

export default logger;
