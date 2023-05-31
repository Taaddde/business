import { MiddlewareConsumer, Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../../../../shared/schemas/user.schema';
import { JWTModule } from '../../../../../shared/modules/jwt/jwt.module';
import { CryptModule } from '../../../../../shared/modules/crypt/crypt.module';
import { JwtMiddleware } from '../../middlewares/jwt.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ClientsModule.register([
      { name: 'BUSINESS_SERVICE', transport: Transport.TCP },
    ]),
    JWTModule,
    CryptModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('/users/list');
  }
}