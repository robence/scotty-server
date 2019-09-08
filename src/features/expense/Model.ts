import { Document, Schema, Model, model, Types } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

// var ObjectId = require('mongoose').;

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

/* eslint-disable-next-line func-names */
ExpenseSchema.statics.getExpensesByUser = function(id): any {
  // const userId = new mongo.ObjectId(id);
  const userId = new Types.ObjectId(id);
  // var query = { campaign_id: new Types.ObjectId(campaign._id) };
  console.log('hello there');
  console.log(userId);
  return this.find({ userId });
};

const ExpenseModel: Model<ExpenseModelType> = model<ExpenseModelType>(
  'Expense',
  ExpenseSchema,
);

export default ExpenseModel;
