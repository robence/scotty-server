import { IContact } from './contact';
import { IBaseEntry, ITemplateEntry, IAccount } from './entry';
import { IMainCategory, ISubCategory } from './category';
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
  IBaseEntry,
  ITemplateEntry,
  IAccount,
  IMainCategory,
  ISubCategory,
  ITag,
  IRegister,
  ILogin,
  IAccount,
  IUser,
};
