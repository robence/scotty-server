import { Request } from 'express';
import { UserType } from '../features/user/Model';

interface Token {
  token: string;
}

interface User {
  user: UserType;
}

interface Authenticate {
  user: { id: string };
}

export interface AuthenticatedRequest extends Request, Authenticate {}
export interface LoginRequest extends Request, Token, User {}
