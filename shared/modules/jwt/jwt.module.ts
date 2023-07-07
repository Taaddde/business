import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTService } from './jwt.service';
import "../../load-env-vars";

import { config } from "../../config";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.jwt.key,
      signOptions: {expiresIn: config.jwt.expiresIn}
    })],
  providers: [JWTService],
  exports: [JWTService]
})
export class JWTModule {}