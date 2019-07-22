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

  // TODO: print stacktrace if not production
  // TODO: return with or without stacktrace according to env
  res.status(500).json({ error });
}
