import { IBaseModel, ICategory, ITag, IUser } from '.';

export interface IRecord extends IBaseModel {
  amount: number;
  category: ICategory;
  // account:
  title?: string;
  notes?: string;
  tags?: ITag[];
}

export interface ITemplateRecord extends IRecord {
  user: IUser;
}

/*

test it
export interface IRecord extends IBaseModel {
  amount: number;
  category: IBaseCategory;
}

*/
