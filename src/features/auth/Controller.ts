import { Request, Response } from 'express';
import * as expressAsyncHandler from 'express-async-handler';
import {
  ClassWrapper,
  Controller,
  Get,
  Post,
  Middleware,
} from '@overnightjs/core';
import passport from 'passport';

import { authenticate, generateToken, sendToken, logout } from './Service';

@Controller('api/auth')
@ClassWrapper(expressAsyncHandler)
class UserController {
  @Post('/login')
  @Middleware([
    passport.authenticate('local', { session: false }),
    generateToken,
  ])
  private async login(req: Request, res: Response): Promise<void> {
    res.status(200).send(sendToken(req, res));
  }

  @Get('/logout')
  private async logout(req: Request, res: Response): Promise<void> {
    res.status(200).send(logout(req, res));
  }

  @Get('/auth-user')
  @Middleware(authenticate)
  private async authUser(_: Request, res: Response): Promise<void> {
    res.status(200).send();
  }
}

const instance = new UserController();
export default instance;
