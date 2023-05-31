import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { UserService } from './user.service';

import { IsEmailPipe } from '../../decorators/is-email-format.decorator';
import { IsPasswordPipe } from '../../decorators/is-password-format.decorator';

import { JWTService } from '../../../../../shared/modules/jwt/jwt.service';
import { CryptService } from '../../../../../shared/modules/crypt/crypt.service';

@Controller('users')
export class UserController {
  constructor(
    @Inject('BUSINESS_SERVICE') private client: ClientProxy,
    private userService: UserService,
    private jwtService: JWTService,
    private cryptService: CryptService,
  ) {}
    
  @Post('/register')
  async register(
    @Body('email', new IsEmailPipe) email: string,
    @Body('password', new IsPasswordPipe) password: string
  ) {
    if (!email || !password) throw new BadRequestException('Email o contraseña no enviado');

    const exist = await this.userService.checkExists(email);
    if (exist) throw new HttpException('Email en uso', HttpStatus.CONFLICT);

    password = await this.cryptService.hashPassword(password);
    const save = await this.userService.saveUser({email, password});
    return save;
  }

  @Post('/login')
  async login(
    @Body() user: { email: string; password: string },
  ) {
    const { email, password } = user;
    if (!email || !password) throw new BadRequestException('Email o password no enviado');

    const exist = await this.userService.checkExists(email);
    if (!exist) throw new HttpException('Email no existe', HttpStatus.UNAUTHORIZED);

    const check = await this.cryptService.comparePasswords(password, exist.password);

    if (!check) throw new HttpException('Email o contraseña inválido', HttpStatus.UNAUTHORIZED);

    const token = await this.jwtService.getAccessToken(user);
    return token;
  }

  @Get('')
  async getList(
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = ''
  ) {
    return await this.client.send({cmd: 'get_users'}, {page, limit, search});
  }
}
