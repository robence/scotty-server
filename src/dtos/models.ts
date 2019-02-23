interface IBaseModel {
  _id: number;
  createdAt: Date;
  updatedAt: Date;
  // createdUser?: string;
  // lastUpdatedUser?: string;
}

export interface IRegister extends IBaseModel {
  name: string;
  email: string;
  gender: string;
  phone: number;
}

export interface IContact extends IBaseModel {
  username: string;
  email: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IUser extends IBaseModel {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export interface IAccount extends IBaseModel {
  name: string;
  user: IUser;
}

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

export interface IBaseCategory extends IBaseModel {
  categoryName: string;
}

export interface IMainCategory extends IBaseCategory {
  _categoryId: number;
}

export interface SubCategory extends IBaseCategory {
  mainCategory: IMainCategory;
}

export interface ITag extends IBaseModel {
  name: string;
}
