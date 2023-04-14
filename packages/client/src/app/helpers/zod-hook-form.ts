import { useCallback } from 'react';
import { pickBy } from 'lodash/fp';
import { SafeParseReturnType } from 'zod';
import { get, set } from 'lodash';

export const useFormResolver = <T>(
  safeParse: (data: unknown) => SafeParseReturnType<unknown, T>
) => {
  return useCallback(
    (data: unknown) => {
      const sanitizedValues = pickBy((value) => value !== '', data || {});

      const parsed = safeParse(sanitizedValues);

      if (parsed.success) {
        return {
          values: parsed.data,
          errors: {},
        };
      } else {
        const errors = Object.entries(
          parsed.error.flatten().fieldErrors
        ).reduce((total, [key, value]) => {
          set(total, key, { message: get(value, 0), type: 'validation' });

          return total;
        }, {});

        return {
          values: {},
          errors,
        };
      }
    },
    [safeParse]
  );
};
