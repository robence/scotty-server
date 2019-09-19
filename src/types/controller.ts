import { Request } from 'express';

interface Token {
  token: string;
}

interface Authenticate {
  user: { id: string };
}

export interface AuthenticatedRequest extends Request, Authenticate {}
export interface TokenizedRequest extends Request, Token {}
