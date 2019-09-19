import { OK } from 'http-status-codes';

import CategoryModel, { CategoryType } from './Model';
import ResponseType from '../../types/service';
import { HTTPBadRequest } from '../../error/http-400.error';

interface SingleCategory {
  category: CategoryType;
}

interface MultipleCategories {
  categories: CategoryType[];
}

class CategoryService {
  async createCategory(
    body: CategoryType,
  ): Promise<ResponseType<SingleCategory>> {
    const categoryModel = new CategoryModel(body);
    const category = await categoryModel.save();
    if (!category) throw new HTTPBadRequest('could not save category');
    return { status: OK, payload: { category } };
  }

  async retrieveCategories(): Promise<ResponseType<MultipleCategories>> {
    const categories = await CategoryModel.find({});
    return { status: OK, payload: { categories } };
  }
}

const instance = new CategoryService();
export default instance;
