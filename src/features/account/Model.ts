/* eslint-disable */
// @ts-ignore
const mongoose = require('mongoose');
// import { Document, Schema, Model, model } from 'mongoose';
// import * as uniqueValidator from 'mongoose-unique-validator';

// export type AccountType = {
//   name: string;
// };
// export type AccountModelType = Document & AccountType;

const AccountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true },
);

// AccountSchema.plugin(uniqueValidator);

// const AccountModel: Model<AccountModelType> = model<AccountModelType>('Account', AccountSchema);

// export default AccountModel;

mongoose.model('Account', AccountSchema);
