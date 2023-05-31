import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTService } from './jwt.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1h'}
    })],
  providers: [JWTService],
  exports: [JWTService]
})
export class JWTModule {}