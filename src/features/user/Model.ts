import { Document, Schema, Model, model } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type UserType = {
  username: string;
  email: string;
};

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
  },
  { timestamps: true },
);

UserSchema.plugin(uniqueValidator);

// prettier-ignore
export const UserModel: Model<Document & UserType> = model<Document & UserType>(
  'User',
  UserSchema
);