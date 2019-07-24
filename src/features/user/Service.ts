import { OK } from 'http-status-codes';

import UserModel, { UserType, UserModelType } from './Model';
import ResponseType from '../../types/response';
import { HTTPBadRequest, HTTPNotFound } from '../../error/http-400.error';
import { update } from '../../utils/model';

type SingleUser = { user: UserType };
type MultipleUsers = { users: UserType[] };

class UserService {
  async createUser(body: UserType): Promise<ResponseType<SingleUser>> {
    const userModel = new UserModel(body);
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
    const body = await UserModel.findById(id);
    if (!body) throw new HTTPNotFound('user not found');
    update<UserModelType, Partial<UserType>>(body, updateObject);
    const user = await body.save();
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
