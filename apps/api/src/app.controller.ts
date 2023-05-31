import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('BUSINESS_SERVICE') private client: ClientProxy
  ) {}

  @Get('/')
  getUserList() {
    const list = this.client.send({cmd: 'get_users'}, {page: 0, limit: 10, search: ''});
    return list;
  }
}
