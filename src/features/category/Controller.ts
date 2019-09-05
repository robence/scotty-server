import { Request, Response } from 'express';
import * as expressAsyncHandler from 'express-async-handler';
import { ClassWrapper, Controller, Get, Post } from '@overnightjs/core';
import CategoryService from './Service';

@Controller('api/categories')
@ClassWrapper(expressAsyncHandler)
class CategoryController {
  @Post('/')
  private async createCategory(req: Request, res: Response): Promise<void> {
    const { status, payload } = await CategoryService.createCategory(req.body);
    res.status(status).send(payload);
  }

  @Get('/')
  private async getCategories(req: Request, res: Response): Promise<void> {
    const { status, payload } = await CategoryService.retrieveCategories();
    res.status(status).send(payload);
  }
}

const instance = new CategoryController();
export default instance;