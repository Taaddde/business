import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../../../../shared/schemas/user.schema';
import { JWTModule } from 'shared/modules/jwt/jwt.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), JWTModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
