import { Document, Schema, Model, model } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

// TODO: add types

export interface ExpenseType {
  amount: number;
  categoryId: string;
  tagIds: string[];
  accountId: string;
  userId: string;
}

export type ExpenseModelType = Document & ExpenseType;

const ExpenseSchema = new Schema(
  {
    amount: { type: Number, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    tagIds: [{ type: Schema.Types.ObjectId, ref: 'Tag', default: [] }],
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

ExpenseSchema.plugin(uniqueValidator);

const ExpenseModel: Model<ExpenseModelType> = model<ExpenseModelType>(
  'Expense',
  ExpenseSchema,
);

export default ExpenseModel;
