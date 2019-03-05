import { Document, Schema, Model, model } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { IAccount } from '../entities';

export interface IAccountModel extends Document {}

export const AccountSchema = Schema(
  {
    name: {
      type: String,
    },
    user: {
      type: String,
    },
  },
  { timestamps: true },
);

AccountSchema.plugin(uniqueValidator);

AccountSchema.statics.get = function(callback, limit): IAccount {
  return Account.find(callback).limit(limit);
};

const Account: Model<IAccountModel> = model<IAccountModel>(
  'Account',
  AccountSchema,
);

export default Account;
