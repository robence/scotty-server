import { Document, Schema, Model, model } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type ExpenseType = {
  amount: number;
  categoryId: any;
  tagIds: any[];
  accountId: any;
  userId: any;
};

export type ExpenseModelType = Document & ExpenseType;

const ExpenseSchema = new Schema(
  {
    amount: { type: Number },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    tagIds: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

ExpenseSchema.plugin(uniqueValidator);

const ExpenseModel: Model<ExpenseModelType> = model<ExpenseModelType>(
  'Expense',
  ExpenseSchema,
);

export default ExpenseModel;
