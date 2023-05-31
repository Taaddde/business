import { Injectable } from '@nestjs/common';
import { IUser, User } from '../../../../../shared/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}


  checkExists(email): Promise<IUser> {
    const result = this.userModel.findOne({email}).exec();
    return result;
  }

  async saveUser(user: IUser): Promise<IUser> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
}
