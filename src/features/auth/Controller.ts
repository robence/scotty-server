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
import { AuthenticatedRequest, LoginRequest } from '../../types/controller';
import UserService from '../user/Service';

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
    { user, token }: LoginRequest,
    res: Response,
  ): Promise<void> {
    res.status(200).send({ user, token });
  }

  @Get('logout')
  private async logout(req: Request, res: Response): Promise<void> {
    res.status(200).send(logout(req, res));
  }

  @Middleware(authenticate)
  @Get('auth-user')
  private async findUserByToken(
    { user }: AuthenticatedRequest,
    res: Response,
  ): Promise<void> {
    const { status, payload } = await UserService.retrieveUser(user.id);
    res.status(status).send(payload);
  }
}

const instance = new AuthController();
export default instance;
