import { OK } from 'http-status-codes';

import { UserType, UserModel } from './Model';
import ResponseType from '../../types/response';
import { HTTP400Error, HTTP404Error } from '../../error/http-400.error';
import updateModel, { updateModel2 } from '../../utils/helper';

type SingleUser = { user: UserType };
type MultipleUsers = { users: UserType[] };

class UserService {
  async createUser(body: UserType): Promise<ResponseType<SingleUser>> {
    const userModel = new UserModel(body);
    const user = await userModel.save();
    if (!user) throw new HTTP400Error('could not save user');
    return { status: OK, payload: { user } };
  }

  async retrieveUsers(): Promise<ResponseType<MultipleUsers>> {
    const users = await UserModel.find({});
    return { status: OK, payload: { users } };
  }

  async retrieveUser(id: number): Promise<ResponseType<SingleUser>> {
    const user = await UserModel.findById(id);
    if (!user) throw new HTTP404Error('user not found');
    return { status: OK, payload: { user } };
  }

  async updateUser(
    id: number,
    updateObject: Partial<UserType>,
  ): Promise<ResponseType<SingleUser>> {
    const body = await UserModel.findById(id);
    // let body = await UserModel.findById(id);
    if (!body) throw new HTTP404Error('user not found');
    updateModel(body, updateObject);
    // body = updateModel2(body, updateObject);
    const user = await body.save();
    if (!user) throw new HTTP400Error('could not save user');
    return { status: OK, payload: { user } };
  }

  async deleteUser(id: number): Promise<ResponseType<SingleUser>> {
    const user = await UserModel.findByIdAndRemove(id);
    if (!user) throw new HTTP404Error('user not found');
    return { status: OK, payload: { user } };
  }
}

const instance = new UserService();
export default instance;
