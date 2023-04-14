import { z } from 'zod';

import { CustomNumber, CustomString, Tagged, UUID } from '../types';

export type AnswerId = Tagged<'AnswerId', UUID>;

const createAnswerDtoParser = z.object({
  title: CustomString.rangeParser(1, 500),
  points: z.preprocess(
    (value) => Number(value),
    CustomNumber.rangeParser(0, 1000)
  ),
});

export type CreateAnswerDto = z.infer<typeof createAnswerDtoParser>;

const answerParser = createAnswerDtoParser.merge(
  z.object({
    id: UUID.parser<AnswerId>(),
  })
);

export type Answer = Tagged<'Answer', z.infer<typeof answerParser>>;

const create = (dto: CreateAnswerDto, id = UUID.generate<AnswerId>()): Answer =>
  Tagged.tag('Answer', {
    id,
    ...dto,
  });

export { create, answerParser, createAnswerDtoParser };
