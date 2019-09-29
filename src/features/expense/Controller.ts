import { Request, Response } from 'express';
import * as expressAsyncHandler from 'express-async-handler';
import {
  ClassWrapper,
  Controller,
  Get,
  Post,
  Middleware,
} from '@overnightjs/core';
import { authenticate } from '../../middleware/auth';
import { AuthenticatedRequest } from '../../types/controller';
import ExpenseService from './Service';
import { ExpenseType } from './Model';

@Controller('api/expenses')
@ClassWrapper(expressAsyncHandler)
class ExpenseController {
  // -- public routes --
  @Get('/')
  private async getExpenses(req: Request, res: Response): Promise<void> {
    const { status, payload } = await ExpenseService.retrieveExpenses();
    res.status(status).send(payload);
  }

  @Get('user/:id')
  private async getExpensesByUser(req: Request, res: Response): Promise<void> {
    const { status, payload } = await ExpenseService.retrieveExpensesByUser(
      req.params.id,
    );
    res.status(status).send(payload);
  }

  // -- protected routes --

  @Middleware(authenticate)
  @Post('/')
  private async createExpense(
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> {
    const expense: ExpenseType = { ...req.body, userId: req.user.id };
    const { status, payload } = await ExpenseService.createExpense(expense);
    res.status(status).send(payload);
  }

  @Middleware(authenticate)
  @Get('token')
  private async getExpensesByToken(
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> {
    const { status, payload } = await ExpenseService.retrieveExpensesByUser(
      req.user.id,
    );
    res.status(status).send(payload);
  }
}

const instance = new ExpenseController();
export default instance;
