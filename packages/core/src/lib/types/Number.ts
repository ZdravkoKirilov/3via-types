import { z } from 'zod';

import { Tagged } from './Tagged';

export type IntegerInRange<Min extends number, Max extends number> = Tagged<
  'IntegerInRange',
  {
    min: Min;
    max: Max;
  } & number
>;

enum Errors {
  Required = 'Required',
  NotANumber = 'NotANumber',
  BelowRange = 'BelowRange',
  AboveRange = 'AboveRange',
}

const rangeParser = <Min extends number, Max extends number>(
  min: Min,
  max: Max
) =>
  z.preprocess(
    (value) => Number(value),
    z
      .number({
        required_error: Errors.Required,
        invalid_type_error: Errors.NotANumber,
      })
      .min(min, { message: Errors.BelowRange })
      .max(max, { message: Errors.AboveRange })
      .transform((result) => result as IntegerInRange<Min, Max>)
  );

export const CustomNumber = { Errors, rangeParser };
