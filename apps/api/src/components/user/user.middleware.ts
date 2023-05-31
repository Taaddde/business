import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../../../../../shared/modules/jwt/jwt.service'


@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JWTService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return new UnauthorizedException('Se requiere un token');

    const decodedToken = await this.jwtService.verifyToken(token);
    if (!decodedToken) return new UnauthorizedException('Token inválido')

    req.user = decodedToken;
    next();
  }
}
