import { OK } from 'http-status-codes';

import UserModel, { UserType, UserModelType } from './Model';
import ResponseType from '../../types/response';
import { HTTPBadRequest, HTTPNotFound } from '../../error/http-400.error';
import { update } from '../../utils/model';

interface SingleUser {
  user: UserType;
}
interface MultipleUsers {
  users: UserType[];
}
interface SubDocumentInsert {
  userId: number;
  name: string;
}

class UserService {
  async createUser(body: UserType): Promise<ResponseType<SingleUser>> {
    const userModel = new UserModel(body);
    const user = await userModel.save();
    if (!user) throw new HTTPBadRequest('could not save user');
    return { status: OK, payload: { user } };
  }

  async addTag({
    userId,
    name,
  }: SubDocumentInsert): Promise<ResponseType<SingleUser>> {
    const userModel = await UserModel.findById(userId);
    if (!userModel) throw new HTTPNotFound('user not found');
    userModel.tags.push({ name });
    const user = await userModel.save();
    if (!user) throw new HTTPBadRequest('could not save user');
    return { status: OK, payload: { user } };
  }

  async addAccount({
    userId,
    name,
  }: SubDocumentInsert): Promise<ResponseType<SingleUser>> {
    const userModel = await UserModel.findById(userId);
    if (!userModel) throw new HTTPNotFound('user not found');
    userModel.accounts.push({ name });
    const user = await userModel.save();
    if (!user) throw new HTTPBadRequest('could not save user');
    return { status: OK, payload: { user } };
  }

  async retrieveUsers(): Promise<ResponseType<MultipleUsers>> {
    const users = await UserModel.find({});
    return { status: OK, payload: { users } };
  }

  async retrieveUser(id: number): Promise<ResponseType<SingleUser>> {
    const user = await UserModel.findById(id);
    if (!user) throw new HTTPNotFound('user not found');
    return { status: OK, payload: { user } };
  }

  async updateUser(
    id: number,
    updateObject: Partial<UserType>,
  ): Promise<ResponseType<SingleUser>> {
    const userModel = await UserModel.findById(id);
    if (!userModel) throw new HTTPNotFound('user not found');

    // one liner to modify a mongoose model
    // similar to { ...userModel, ...updateObject } but
    // 1) that does not work, mongoose model has prototype methods
    // 2) does not create new instance, _id remains the same
    update<UserModelType, Partial<UserType>>(userModel, updateObject);

    const user = await userModel.save();
    if (!user) throw new HTTPBadRequest('could not save user');

    return { status: OK, payload: { user } };
  }

  async deleteUser(id: number): Promise<ResponseType<string>> {
    const user = await UserModel.findByIdAndRemove(id);
    if (!user) throw new HTTPNotFound('user not found');
    return { status: OK, payload: user._id };
  }
}

const instance = new UserService();
export default instance;
