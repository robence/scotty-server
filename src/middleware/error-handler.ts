import { Request, Response } from 'express';
import { Logger } from '@overnightjs/logger';

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
): void {
  Logger.Err('Unexpected error.');
  Logger.Err(error.name);
  Logger.Err(error.message);

  res.status(500).json({ error });
}
