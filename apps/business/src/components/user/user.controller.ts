import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { IUserList } from 'shared/schemas/user.schema';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @MessagePattern({cmd: 'get_users'})
  getUsers(data: { page: number; limit: number; search: string }): Promise<IUserList[]> {
    const {page = 0, limit = 10, search = ''} = data;
    return this.userService.getUsers(page, limit, search)
  }
}
