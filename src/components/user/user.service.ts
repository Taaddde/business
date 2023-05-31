import { Injectable } from '@nestjs/common';
import { User } from '../../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers(page: number, limit: number, search: string): Promise<any[]> {
    const result = this.userModel.find().skip(page * limit).limit(limit);
    return result;
  }
}
