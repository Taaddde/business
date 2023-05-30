import { Injectable } from '@nestjs/common';
import { IUserList, UserModel } from '../../schemas/user.schema';

@Injectable()
export class UserService {
  async getUsers(page: number, limit: number, search: string): Promise<IUserList[]> {
    const result = await UserModel.aggregate([]).exec();
    return result;
  }
}
