import { IBaseModel } from '.';

export interface IBaseEntry extends IBaseModel {
  amount: number;
  title: string;
  notes: string;
  tags: ITag[];
}

export interface ITemplateEntry extends IBaseEntry {
  user: IUser;
}

export interface IAccountEntry extends IBaseEntry {
  account: IAccount;
}
