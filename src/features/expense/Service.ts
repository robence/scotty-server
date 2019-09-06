import { OK } from 'http-status-codes';

import ExpenseModel, { ExpenseType } from './Model';
import ResponseType from '../../types/response';
import { HTTPBadRequest } from '../../error/http-400.error';

interface SingleExpense {
  expense: ExpenseType;
}

interface MultipleExpenses {
  expenses: ExpenseType[];
}

class ExpenseService {
  async createExpense(body: ExpenseType): Promise<ResponseType<SingleExpense>> {
    const expenseModel = new ExpenseModel(body);
    const expense = await expenseModel.save();
    if (!expense) throw new HTTPBadRequest('could not save expense');
    return { status: OK, payload: { expense } };
  }

  async retrieveExpenses(): Promise<ResponseType<MultipleExpenses>> {
    const expenses = await ExpenseModel.find({});
    return { status: OK, payload: { expenses } };
  }
}

const instance = new ExpenseService();
export default instance;
