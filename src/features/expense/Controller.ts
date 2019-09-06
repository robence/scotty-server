import { Request, Response } from 'express';
import * as expressAsyncHandler from 'express-async-handler';
import { ClassWrapper, Controller, Get, Post } from '@overnightjs/core';
import ExpenseService from './Service';

@Controller('api/expenses')
@ClassWrapper(expressAsyncHandler)
class ExpenseController {
  @Post('/')
  private async createExpense(req: Request, res: Response): Promise<void> {
    const { status, payload } = await ExpenseService.createExpense(req.body);
    res.status(status).send(payload);
  }

  @Get('/')
  private async getExpenses(req: Request, res: Response): Promise<void> {
    const { status, payload } = await ExpenseService.retrieveExpenses();
    res.status(status).send(payload);
  }
}

const instance = new ExpenseController();
export default instance;
