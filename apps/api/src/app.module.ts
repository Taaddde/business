import { Module } from '@nestjs/common';
import { UserModule } from './components/login/user.module';

@Module({
  imports: [UserModule]
})
export class AppModule {}