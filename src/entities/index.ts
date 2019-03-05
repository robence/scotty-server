import { IContact } from './contact';
import { IRecord, ITemplateRecord } from './record';
import { ICategory } from './category';
import { ITag } from './tag';
import { IRegister, ILogin, IAccount, IUser } from './user';

export interface IBaseModel {
  _id: number;
  createdAt: Date;
  updatedAt: Date;
  // createdUser?: string;
  // lastUpdatedUser?: string;
}

export {
  IContact,
  IRecord,
  // ITemplateRecord,
  ICategory,
  ITag,
  // IRegister,
  // ILogin,
  IAccount,
  IUser,
};
