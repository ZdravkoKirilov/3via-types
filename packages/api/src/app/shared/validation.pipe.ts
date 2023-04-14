import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { z } from 'zod';

import { Errors, zodToDomain } from '@3via/core';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.Schema<unknown>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const parsed = zodToDomain(this.schema, value);

      if (Errors.isCustomError(parsed)) {
        throw new BadRequestException(new Errors.ParsingError(parsed));
      }

      return parsed;
    }

    return value;
  }
}

@Injectable()
export class IDParamPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type === 'param') {
      const parsed = zodToDomain(z.string(), value);

      if (Errors.isCustomError(parsed)) {
        throw new BadRequestException(parsed);
      }

      return parsed;
    }

    return value;
  }
}
