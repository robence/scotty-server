import { IBaseModel } from '.';

export interface IMainCategory extends IBaseModel {
  categoryName: string;
}

export interface SubCategory extends IBaseCategory {
  mainCategory: IMainCategory;
}
