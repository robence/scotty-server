import { Request, Response } from 'express';
import {
  ClassWrapper,
  Controller,
  Get,
  Post,
  Put,
  Delete,
} from '@overnightjs/core';
// import * as expressAsyncHandler from 'express-async-handler';
import { BASE, ID, USER } from '../../url';
import UserService from './Service';
import wrapAsync from '../../utils/async';

@Controller(`${BASE}${USER}`)
// TODO: compare with express-async-handler
@ClassWrapper(wrapAsync)
class UserController {
  @Post()
  private async create(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.createUser(req.body);
    res.status(status).send(payload);
  }

  @Get()
  private async readAll(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.retrieveUsers();
    res.status(status).send(payload);
  }

  @Get(ID)
  private async read(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.retrieveUser(req.params.id);
    res.status(status).send(payload);
  }

  @Put(ID)
  private async update(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.updateUser(
      req.params.id,
      req.body,
    );
    res.status(status).send(payload);
  }

  @Delete(ID)
  private async delete(req: Request, res: Response): Promise<void> {
    const { status, payload } = await UserService.deleteUser(req.params.id);
    res.status(status).send(payload);
  }
}

const instance = new UserController();
export default instance;
