import { IBaseModel } from '.';

interface SubCategory extends IBaseModel {
  name: string;
}

export interface ICategory extends IBaseModel {
  name: string;
  subCategories?: SubCategory[];
}
