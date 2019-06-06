import { Document, Schema, Model, model } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { IContact, IBaseModel } from '../entities';

export interface IContactModel extends Document {
  _id: number;
  username: string;
  email: string;
  get(callback: any, limit: number): IContact;
}

export const ContactSchema = new Schema(
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

ContactSchema.plugin(uniqueValidator);

const Contact: Model<IContactModel> = model<IContactModel>(
  'Contact',
  ContactSchema,
);

export default Contact;
