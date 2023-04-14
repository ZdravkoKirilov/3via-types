import axios from 'axios';

import {
  AppUrls,
  Errors,
  QuestionEntity,
  UrlParams,
  buildUrlWithParams,
} from '@3via/core';
import { environment } from '../../environments/environment';

const baseURL = environment.baseURL;

const client = axios.create({
  baseURL,
});

const getQuestions = (): Promise<QuestionEntity.Question[]> => {
  const url = AppUrls.questions;

  return client
    .get(url)
    .then((response) => {
      const parsed = QuestionEntity.toEntities(response.data);

      if (parsed.success) {
        return parsed.data;
      }

      throw new Errors.ParsingError(parsed.error.flatten().fieldErrors);
    })
    .catch(normalizeApiError);
};

const saveQuestions = (
  newQuestions: QuestionEntity.Question[]
): Promise<QuestionEntity.Question[]> => {
  const url = AppUrls.questions;

  return client
    .put(url, newQuestions)
    .then((response) => {
      const parsed = QuestionEntity.toEntities(response.data);

      if (parsed.success) {
        return parsed.data;
      }

      throw new Errors.ParsingError(parsed.error.flatten().fieldErrors);
    })
    .catch(normalizeApiError);
};

const addQuestion = (
  dto: QuestionEntity.CreateQuestionDto
): Promise<QuestionEntity.Question> => {
  const url = AppUrls.questions;

  return client
    .post(url, dto)
    .then((response) => {
      const parsed = QuestionEntity.toEntity(response.data);

      if (parsed.success) {
        return parsed.data;
      }

      throw new Errors.ParsingError(parsed.error.flatten().fieldErrors);
    })
    .catch(normalizeApiError);
};

const editQuestion = (
  dto: QuestionEntity.Question
): Promise<QuestionEntity.Question> => {
  const url = buildUrlWithParams(AppUrls.question, {
    [UrlParams.QuestionId]: dto.id,
  });

  return client
    .put(url, dto)
    .then((response) => {
      const parsed = QuestionEntity.toEntity(response.data);

      if (parsed.success) {
        return parsed.data;
      }

      throw new Errors.ParsingError(parsed.error.flatten().fieldErrors);
    })
    .catch(normalizeApiError);
};

const deleteQuestion = (id: QuestionEntity.Question['id']): Promise<void> => {
  const url = buildUrlWithParams(AppUrls.question, {
    [UrlParams.QuestionId]: id,
  });

  return client
    .delete(url)
    .then(() => {
      return undefined;
    })
    .catch(normalizeApiError);
};

export const httpApi = {
  addQuestion,
  getQuestions,
  editQuestion,
  deleteQuestion,
  saveQuestions,
};

const normalizeApiError = (err: unknown) => {
  const apiError = Errors.toError(err);

  if (apiError) {
    throw apiError;
  }

  throw new Errors.UnexpectedError(apiError);
};
