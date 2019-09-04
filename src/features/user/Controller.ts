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
  @Post('tag')
  private async addTag(req: Request, res: Response): Promise<void> {
    console.log('req.body');
    console.log(req.body);
    const { status, payload } = await UserService.addTag(req.body);
    res.status(status).send(payload);
    // res.status(200).send('Oke');
  }

  @Post('/')
  private async create(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.createUser(req.body);
    res.status(status).send(payload);
  }

  @Get('/')
  private async readAll(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.retrieveUsers();
    res.status(status).send(payload);
  }

  @Get(':id')
  private async read(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.retrieveUser(req.params.id);
    res.status(status).send(payload);
  }

  @Get('abc/:id')
  private async read2(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.retrieveUser(req.params.id);
    res.status(status).send(payload);
  }

  @Put(':id')
  private async update(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.updateUser(
      req.params.id,
      req.body,
    );
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
