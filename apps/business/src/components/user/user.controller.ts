import {
  Controller,
  Get,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { IUserList } from 'shared/schemas/user.schema';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';

@Controller()
@UseInterceptors(AuthInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get_users' })
  async getUsers(data: {
    page: number;
    limit: number;
    search: string;
  }): Promise<IUserList> {
    const { page = 0, limit = 10, search = '' } = data;
    const docs = await this.userService.getUsers(page, limit, search);
    return docs;
  }
}
