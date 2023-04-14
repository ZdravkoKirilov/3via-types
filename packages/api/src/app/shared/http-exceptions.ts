import { Errors } from '@3via/core';
import { HttpException, HttpStatus } from '@nestjs/common';

export const toUnexpectedError = (error: Errors.CustomError) =>
  new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);

export const toBadRequest = (error: Errors.CustomError) =>
  new HttpException(error, HttpStatus.BAD_REQUEST);
