import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';
import { isEmail } from 'class-validator';

@Injectable()
export class IsEmailPipe implements PipeTransform {
  transform(value: any) {
    if (!isEmail(value)) {
      throw new BadRequestException('Invalid email format');
    }
    return value;
  }
}
