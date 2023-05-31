import { Injectable } from '@nestjs/common';
import { IUser, IUserList, User } from 'shared/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers(page: number, limit: number, search: string): Promise<IUserList> {
    const docs: IUser[] = await this.userModel.find({}).skip(page * limit).limit(limit).select({email: 1}).exec();
    const result: IUserList = {
      docs,
      page,
      limit,
    }
    return result;
  }
}
