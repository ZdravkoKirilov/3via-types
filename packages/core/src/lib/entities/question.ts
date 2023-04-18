/*

This file deals with the "Question" entity which is essential to any Quiz. It
contains all business logic related to that entity.

It contains parsers and types for essential DTOs for creation / entity serialization / updates.
It contains different methods for other Question-mutating operations like:

- updating the Question entity itself
- adding / removing / reordering Answers

*/

import { z } from 'zod';

import * as AnswerEntity from './answer';
import { moveArrayItem } from '../helpers';
import { CustomString, Tagged, UUID } from '../types';

const createQuestionDtoParser = z.object({
  title: CustomString.rangeParser(1, 500),
  hint: CustomString.rangeParser(5, 600),
});

export type QuestionId = Tagged<'QuestionId', UUID>;

export type CreateQuestionDto = z.infer<typeof createQuestionDtoParser>;

const questionParser = z
  .object({
    id: UUID.parser<QuestionId>(),
    answers: z.array(AnswerEntity.answerParser),
  })
  .merge(createQuestionDtoParser);

export type Question = Tagged<'Question', z.infer<typeof questionParser>>;

const create = (
  dto: CreateQuestionDto,
  id = UUID.generate<QuestionId>()
): Question =>
  Tagged.tag('Question', {
    ...dto,
    id,
    answers: [],
  });

const update = (
  existingQuestion: Question,
  updatedQuestion: Question
): Question =>
  Tagged.tag('Question', {
    id: existingQuestion.id,
    title: updatedQuestion.title,
    hint: updatedQuestion.hint,
    answers: updatedQuestion.answers,
  });

const toEntity = (source: unknown) => {
  return questionParser.safeParse(source);
};

const toEntities = (source: unknown) => {
  return z.array(questionParser).safeParse(source);
};

const addAnswer = (
  dto: AnswerEntity.CreateAnswerDto,
  question: Question
): Question => {
  const newAnswer = AnswerEntity.create(dto);

  const updatedQuestion = {
    ...question,
    answers: [...question.answers, newAnswer],
  };

  return updatedQuestion;
};

const removeAnswer = (
  answerId: AnswerEntity.Answer['id'],
  question: Question
): Question => {
  const updatedQuestion = {
    ...question,
    answers: question.answers.filter((answer) => answer.id !== answerId),
  };

  return updatedQuestion;
};

const updateAnswers = (
  answers: AnswerEntity.Answer[],
  question: Question
): Question => {
  return { ...question, answers };
};

const questionsParser = z.array(questionParser);

const moveAnswer = (
  direction: 'up' | 'down',
  currentIndex: number,
  question: Question
): Question => {
  const reorderedAnswers = moveArrayItem(
    question.answers,
    currentIndex,
    direction === 'up' ? currentIndex - 1 : currentIndex + 1
  );

  const updatedQuestion = {
    ...question,
    answers: reorderedAnswers,
  };

  return updatedQuestion;
};

const moveQuestion = (
  direction: 'up' | 'down',
  currentIndex: number,
  currentQuestions: Question[]
) => {
  const reorderedQuestions = moveArrayItem(
    currentQuestions,
    currentIndex,
    direction === 'up' ? currentIndex - 1 : currentIndex + 1
  );

  return reorderedQuestions;
};

export {
  create,
  update,
  toEntity,
  toEntities,
  createQuestionDtoParser,
  questionParser,
  questionsParser,
  addAnswer,
  removeAnswer,
  updateAnswers,
  moveAnswer,
  moveQuestion,
};
