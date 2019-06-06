import IContact from './contact';

export interface IBaseModel {
  _id?: number;
  createdAt?: Date;
  updatedAt?: Date;

  // TODO
  // createdUser?: string;
  // lastUpdatedUser?: string;
}

export {
  IContact,
};
