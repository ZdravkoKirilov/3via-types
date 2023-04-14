import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

import { Errors } from '@3via/core';

@Catch(HttpException)
export class GlobalHttpCustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const error = exception.getResponse();

    if (Errors.isCustomError(error)) {
      response.status(status).send(error);
      return;
    } else {
      response.status(status).send(new Errors.UnexpectedError(error));
    }
  }
}
