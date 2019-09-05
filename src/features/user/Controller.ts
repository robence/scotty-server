import { Request, Response } from 'express';
import * as expressAsyncHandler from 'express-async-handler';
import {
  ClassWrapper,
  Controller,
  Get,
  Post,
  Put,
  Delete,
} from '@overnightjs/core';
import UserService from './Service';

@Controller('api/users')
@ClassWrapper(expressAsyncHandler)
class UserController {
  @Post('/')
  private async createUser(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.createUser(req.body);
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
  private async getUsers(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.retrieveUsers();
    res.status(status).send(payload);
  }

  @Get(':id')
  private async getUser(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.retrieveUser(req.params.id);
    res.status(status).send(payload);
  }

  @Delete(':id')
  private async delete(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.deleteUser(req.params.id);
    res.status(status).send(payload);
  }
}

const instance = new UserController();
export default instance;
