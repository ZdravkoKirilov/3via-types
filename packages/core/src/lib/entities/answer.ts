import { z } from 'zod';
import { v4 as uuid } from 'uuid';

const createAnswerDtoParser = z.object({
  title: z.string(),
  points: z.preprocess((value) => Number(value), z.number()),
});

export type CreateAnswerDto = z.infer<typeof createAnswerDtoParser>;

const answerParser = createAnswerDtoParser.merge(
  z.object({
    id: z.string(),
  })
);

export type Answer = z.infer<typeof answerParser>;

const create = (dto: CreateAnswerDto, id = uuid()): Answer => ({
  id,
  ...dto,
});

export { create, answerParser, createAnswerDtoParser };
