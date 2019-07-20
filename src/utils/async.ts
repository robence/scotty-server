import { Request, Response, NextFunction } from 'express';

export default function wrapAsync(fn): Function {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
