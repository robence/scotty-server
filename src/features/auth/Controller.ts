import { Response } from 'express';
import * as expressAsyncHandler from 'express-async-handler';
import { ClassWrapper, Controller, Post, Middleware } from '@overnightjs/core';
import * as passport from 'passport';

import { generateToken } from '../../middleware/auth';
import { LoginRequest } from '../../types/controller';

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
}

const instance = new AuthController();
export default instance;
