import { IBaseModel } from '.';

interface SubCategory extends IBaseModel {
  name: string;
}

export interface ICategory extends IBaseModel {
  name: string;
  subCategories?: SubCategory[];
}

/*
testing purposes

export IBaseCategory extends IBaseModel {
  name: string;
}
export interface SubCategory extends IBaseModel, IBaseCategory {}

export interface IMainCategory extends IBaseModel, IBaseCategory {
  subCategories?: SubCategory[];
}



*/
