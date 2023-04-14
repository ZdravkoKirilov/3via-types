import { z } from 'zod';
import { get } from 'lodash/fp';

export enum ErrorTypes {
  ParsingError = 'ParsingError',
  UnexpectedError = 'UnexpectedError',
  DomainError = 'DomainError',
}

/* Those could be translatable keys for the FE*/
export enum ErrorMessages {
  InvalidFields = 'InvalidFields',
  UnexpectedError = 'UnexpectedError',
  RepositoryError = 'RepositoryError',
  InvalidAction = 'InvalidAction',
}

type UnknownRecord = Record<string, string>;

export class ParsingError<ErrorShape = UnknownRecord> {
  readonly type = ErrorTypes.ParsingError;
  readonly message: ErrorMessages = ErrorMessages.InvalidFields;

  constructor(public errors: ErrorShape) {}
}

export class DomainError {
  readonly type = ErrorTypes.DomainError;

  constructor(public message: ErrorMessages) {}
}

export class UnexpectedError {
  readonly type = ErrorTypes.UnexpectedError;
  readonly message = ErrorMessages.UnexpectedError;

  constructor(public originalError?: unknown) {}
}

const errorParser = z
  .discriminatedUnion('type', [
    z.object({
      type: z.literal(ErrorTypes.ParsingError),
      message: z.literal(ErrorMessages.InvalidFields),
      errors: z.record(z.string()),
    }),
    z.object({
      type: z.literal(ErrorTypes.DomainError),
      message: z.nativeEnum(ErrorMessages),
    }),
    z.object({
      type: z.literal(ErrorTypes.UnexpectedError),
      message: z.literal(ErrorMessages.UnexpectedError),
      originalError: z.any(),
    }),
  ])
  .transform((value) => {
    if (value.type === ErrorTypes.ParsingError) {
      return new ParsingError(value.errors);
    }

    if (value.type === ErrorTypes.DomainError) {
      return new DomainError(value.message);
    }

    return new UnexpectedError(value.originalError);
  });

export const toError = (source: unknown) => {
  const parsed = errorParser.safeParse(source);

  if (parsed.success) {
    return parsed.data;
  }

  return undefined;
};

export type CustomError = UnexpectedError | DomainError | ParsingError;

export const isCustomError = (error: unknown): error is CustomError =>
  Object.values<unknown>(ErrorTypes).includes(get('type', error));
