import { z } from 'zod';

import { Tagged } from './Tagged';

enum Errors {
  Required = 'Required',
  NotAString = 'NotAString',
  TooShort = 'TooShort',
  TooLong = 'TooLong',
}

export type StringOfLength<Min extends number, Max extends number> = Tagged<
  'StringOfLength',
  {
    min: Min;
    max: Max;
  } & string
>;

const rangeParser = <Min extends number, Max extends number>(
  min: Min,
  max: Max
) =>
  z
    .string({
      required_error: Errors.Required,
      invalid_type_error: Errors.NotAString,
    })
    .min(min, { message: Errors.TooShort })
    .max(max, { message: Errors.TooLong })
    .transform((result) => result as StringOfLength<Min, Max>);

export const CustomString = { Errors, rangeParser };
