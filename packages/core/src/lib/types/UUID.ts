import { z } from 'zod';
import { v4, V4Options } from 'uuid';

export type UUID = string & { readonly __brand: 'UUID' };

enum Errors {
  NotAString = 'NotAString',
  InvalidUUID = 'InvalidUUID',
}

const parser = <T extends UUID>() =>
  z
    .string({
      required_error: Errors.NotAString,
      invalid_type_error: Errors.NotAString,
    })
    .uuid({ message: Errors.InvalidUUID })
    .transform((x) => x as T);

const generate = <T extends UUID>(options?: V4Options) => v4(options) as T;

export const UUID = { Errors, parser, generate };
