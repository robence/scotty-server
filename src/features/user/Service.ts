import { OK } from 'http-status-codes';

import UserModel, {
  UserType,
  UserTypePassword,
  TagType,
  AccountType,
} from './Model';
import ResponseType from '../../types/service';
import { HTTPBadRequest, HTTPNotFound } from '../../error/http-400.error';

interface SingleUser {
  user: UserType;
}
interface MultipleUsers {
  users: UserType[];
}

interface TagResponse {
  tag: TagType;
}

interface AccountResponse {
  account: AccountType;
}
interface SubDocumentInsert {
  userId: number;
  name: string;
}

// TODO: create default account
class UserService {
  async createUser(body: UserTypePassword): Promise<ResponseType<SingleUser>> {
    const userModel = new UserModel(body);
    const user = await userModel.save();
    if (!user) throw new HTTPBadRequest('could not save user');
    return { status: OK, payload: { user } };
  }

  async addTag({
    userId,
    name,
  }: SubDocumentInsert): Promise<ResponseType<TagResponse>> {
    const userModel = await UserModel.findById(userId);
    if (!userModel) throw new HTTPNotFound('user not found');
    userModel.tags.push({ name });
    const user = await userModel.save();
    const tag = user.tags[user.tags.length - 1];
    if (!user) throw new HTTPBadRequest('could not save user');
    return { status: OK, payload: { tag } };
  }

  async addAccount({
    userId,
    name,
  }: SubDocumentInsert): Promise<ResponseType<AccountResponse>> {
    const userModel = await UserModel.findById(userId);
    if (!userModel) throw new HTTPNotFound('user not found');
    userModel.accounts.push({ name });
    const user = await userModel.save();
    const account = user.accounts[user.accounts.length - 1];
    if (!user) throw new HTTPBadRequest('could not save user');
    return { status: OK, payload: { account } };
  }

  async retrieveUsers(): Promise<ResponseType<MultipleUsers>> {
    const users = await UserModel.find({});
    return { status: OK, payload: { users } };
  }

  async retrieveUser(id: string): Promise<ResponseType<SingleUser>> {
    const user = await UserModel.findById(id);
    if (!user) throw new HTTPNotFound('user not found');
    return { status: OK, payload: { user } };
  }

  async deleteUser(id: string): Promise<ResponseType<string>> {
    const user = await UserModel.findByIdAndRemove(id);
    if (!user) throw new HTTPNotFound('user not found');
    /* eslint-disable-next-line no-underscore-dangle */
    return { status: OK, payload: user._id };
  }
}

const instance = new UserService();
export default instance;
