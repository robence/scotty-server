import { Request, Response } from 'express';

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
): void {
  console.log('ULTIMATE ERROR HANDLER');
  console.log(err.name);
  console.log(err.message);

  res.status(500);
  res.json({ error: err });
}
