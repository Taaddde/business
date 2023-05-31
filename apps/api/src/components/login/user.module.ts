import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'BUSINESS_SERVICE', transport: Transport.TCP },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}