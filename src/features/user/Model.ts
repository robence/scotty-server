import { Document, Schema, Model, model } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as bcrypt from 'bcrypt';

/* eslint-disable-next-line */
let mongooseHidden = require('mongoose-hidden')({
  defaultHidden: { password: true },
});

export interface TagType {
  name: string;
}

export interface AccountType {
  name: string;
}

export interface UserType {
  username: string;
  email: string;
  tags: TagType[];
  accounts: AccountType[];
}

export interface UserTypePassword {
  username: string;
  password: string;
  email: string;
  tags: TagType[];
  accounts: AccountType[];
}

export type UserModelType = Document & UserTypePassword;

const TagSchema = new Schema({ name: { type: String } });
const AccountSchema = new Schema({ name: { type: String } });

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [
        /^[a-zA-Z0-9]+$/,
        'is invalid, only letters a-Z and digits 0-9 can be used',
      ],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid, use email@server.domain format'],
    },
    password: {
      type: String,
      required: [true, "can't be blank"],
    },
    tags: { type: [TagSchema], default: [] },
    accounts: { type: [AccountSchema], default: [] },
  },
  { timestamps: true },
);

UserSchema.plugin(uniqueValidator);
UserSchema.plugin(mongooseHidden);

/* eslint-disable-next-line func-names */
UserSchema.pre('save', function(next): void {
  const user = this as UserModelType;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (_: Error, salt): void => {
      bcrypt.hash(user.password, salt, (__: Error, hash: string): void => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const UserModel: Model<UserModelType> = model<UserModelType>(
  'User',
  UserSchema,
);

export default UserModel;
