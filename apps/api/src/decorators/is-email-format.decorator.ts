import { createParamDecorator, BadRequestException } from '@nestjs/common';
import { isEmail } from 'class-validator';

export default createParamDecorator((data, req) => {
    const email = req.body.email;
    if (!isEmail(email)) {
        throw new BadRequestException('Formato de email inválido');
    }
    return email;
});
