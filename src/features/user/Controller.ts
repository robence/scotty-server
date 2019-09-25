import { Request, Response } from 'express';
import * as expressAsyncHandler from 'express-async-handler';
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
import UserService from './Service';

@Controller('api/users')
@ClassWrapper(expressAsyncHandler)
class UserController {
  @Post('/')
  private async createUser(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.createUser(req.body);
    res.status(status).send(payload);
  }

  @Middleware(authenticate)
  @Get('user')
  private async findUserByToken(
    { user }: AuthenticatedRequest,
    res: Response,
  ): Promise<void> {
    const { status, payload } = await UserService.retrieveUser(user.id);
    res.status(status).send(payload);
  }

  @Post('tag')
  private async addTag(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.addTag(req.body);
    res.status(status).send(payload);
  }

  @Post('account')
  private async addAccount(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.addAccount(req.body);
    res.status(status).send(payload);
  }

  @Get('/')
  private async getUsers(_: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.retrieveUsers();
    res.status(status).send(payload);
  }

  @Get(':id')
  private async getUser(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.retrieveUser(req.params.id);
    res.status(status).send(payload);
  }

  @Delete(':id')
  private async deleteUser(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.deleteUser(req.params.id);
    res.status(status).send(payload);
  }
}

const instance = new UserController();
export default instance;
