import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './components/user/user.module';
import '../../../shared/load-env-vars';

import { config } from '../../../shared/config';

@Module({
  imports: [MongooseModule.forRoot(config.mongodb.api), UserModule],
})
export class AppModule {}
