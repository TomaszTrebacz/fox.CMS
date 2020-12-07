import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class formatValidatorErrorsPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      for (const error of errors.values()) {
        const response = error.constraints;

        for (const message in response) {
          throw new BadRequestException(`${response[message]}`);
        }
      }
    }

    return value;
  }
}
