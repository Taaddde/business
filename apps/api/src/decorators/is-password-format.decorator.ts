import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class IsPasswordPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') {
      throw new BadRequestException('Invalid password format');
    }
    return value;
  }
}
