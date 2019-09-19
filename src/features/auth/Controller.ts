import { Request, Response } from 'express';
import * as expressAsyncHandler from 'express-async-handler';
import {
  ClassWrapper,
  Controller,
  Get,
  Post,
  Middleware,
} from '@overnightjs/core';
import * as passport from 'passport';

import { authenticate, generateToken, logout } from '../../middleware/auth';
import { AuthenticatedRequest, TokenizedRequest } from '../../types/controller';

@Controller('api/auth')
@ClassWrapper(expressAsyncHandler)
class AuthController {
  @Middleware([
    passport.authenticate('local', {
      session: false,
      failureRedirect: '/error',
    }),
    generateToken,
  ])
  @Post('login')
  private async login(
    { token }: TokenizedRequest,
    res: Response,
  ): Promise<void> {
    res.status(200).send({ token });
  }

  @Get('logout')
  private async logout(req: Request, res: Response): Promise<void> {
    res.status(200).send(logout(req, res));
  }

  @Middleware(authenticate)
  @Get('auth-user')
  private async authUser(
    { user }: AuthenticatedRequest,
    res: Response,
  ): Promise<void> {
    res.status(200).send({ user });
  }
}

const instance = new AuthController();
export default instance;
