import { Document, Schema, Model, model } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

interface TagType {
  name: string;
}

interface AccountType {
  name: string;
}

export interface UserType {
  username: string;
  email: string;
  tags: TagType[];
  accounts: AccountType[];
}

export type UserModelType = Document & UserType;

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
    tags: { type: [TagSchema], default: [] },
    accounts: { type: [AccountSchema], default: [] },
  },
  { timestamps: true },
);

UserSchema.plugin(uniqueValidator);

const UserModel: Model<UserModelType> = model<UserModelType>(
  'User',
  UserSchema,
);

export default UserModel;
