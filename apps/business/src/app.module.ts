import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './components/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/microservices-challenge'),
    UserModule,
  ],
})
export class AppModule {}
