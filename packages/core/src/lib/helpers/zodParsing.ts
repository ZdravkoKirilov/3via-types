import { z } from 'zod';

import { ParsingError } from '../types/Error';

type UnknownZodType<T> = z.ZodType<T, any, unknown>;

export const zodToDomain = <T, D>(
  schema: UnknownZodType<T>,
  data: D
): ParsingError | z.infer<typeof schema> => {
  const result = schema.safeParse(data);

  if (result.success === true) {
    return result.data;
  }

  return new ParsingError(result.error.flatten().fieldErrors);
};
