import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { AppController } from './app.controller';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'BUSINESS_SERVICE', transport: Transport.TCP },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}