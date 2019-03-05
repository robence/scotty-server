import { IBaseModel } from '.';

export interface IRegister extends IBaseModel {
  name: string;
  email: string;
  gender: string;
  phone: number;
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
  user?: IUser;
}
