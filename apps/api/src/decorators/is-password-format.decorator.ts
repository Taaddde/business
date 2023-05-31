import { createParamDecorator, BadRequestException } from '@nestjs/common';

export default createParamDecorator((data, req) => {
    const password = req.body.password;
    if (typeof password !== 'string') {
        throw new BadRequestException('Formato de contraseña inválido');
    }
    return password;
});
