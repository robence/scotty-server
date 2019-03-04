import { IBaseModel } from '.';

export interface IContact extends IBaseModel {
  username: string;
  email: string;
}
