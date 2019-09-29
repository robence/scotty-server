import { Request, Response } from 'express';
import * as expressAsyncHandler from 'express-async-handler';
import * as passport from 'passport';
import {
  ClassWrapper,
  Controller,
  Get,
  Post,
  Delete,
  Middleware,
} from '@overnightjs/core';
import { AuthenticatedRequest } from '../../types/controller';
import { authenticate } from '../../middleware/auth';
import UserService, { SubDocumentInsert } from './Service';

@Controller('api/users')
@ClassWrapper(expressAsyncHandler)
class UserController {
  // -- public routes --
  @Post('/')
  private async createUser(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.createUser(req.body);
    res.status(status).send(payload);
  }

  @Get('/')
  private async getUsers(_: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.retrieveUsers();
    res.status(status).send(payload);
  }

  @Get('id/:id')
  private async getUser(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.retrieveUser(req.params.id);
    res.status(status).send(payload);
  }

  // -- protected routes --
  @Middleware(authenticate)
  @Post('tag')
  private async addTag(
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> {
    const tag: SubDocumentInsert = { ...req.body, userId: req.user.id };
    const { status, payload } = await UserService.addTag(tag);
    res.status(status).send(payload);
  }

  @Middleware(authenticate)
  @Post('account')
  private async addAccount(
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> {
    const account: SubDocumentInsert = { ...req.body, userId: req.user.id };
    const { status, payload } = await UserService.addAccount(account);
    res.status(status).send(payload);
  }

  @Middleware(authenticate)
  @Get('token')
  private async findUserByToken(
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> {
    const { status, payload } = await UserService.retrieveUser(req.user.id);
    res.status(status).send(payload);
  }

  @Middleware(authenticate)
  @Delete('token')
  private async deleteUserByToken(
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> {
    const { status, payload } = await UserService.deleteUser(req.user.id);
    res.status(status).send(payload);
  }
}

const instance = new UserController();
export default instance;
