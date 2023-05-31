import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { JWTService } from '../../../../shared/modules/jwt/jwt.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
    constructor(
        private readonly jwtService: JWTService
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const data = context.getArgs()[0];
        if (!data.authorization) return of({ error: true, message: 'No autorizado' });

        const token = data.authorization?.split(' ')[1];
        const verify = await this.jwtService.verifyToken(token);
        if (!verify) return of({ error: true, message: 'No autorizado' });

        return next.handle();
    }
}
