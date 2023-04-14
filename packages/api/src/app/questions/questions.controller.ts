import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';

import { AppUrls, Errors, QuestionEntity, UrlParams } from '@3via/core';
import { QuestionsService } from './questions.service';
import {
  IDParamPipe,
  ZodValidationPipe,
  toBadRequest,
  toUnexpectedError,
} from '../shared';

@Controller()
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get(AppUrls.questions)
  async getQuestions(): Promise<QuestionEntity.Question[]> {
    return this.questionService.getQuestions().catch((err) => {
      if (Errors.isCustomError(err)) {
        switch (err.type) {
          case Errors.ErrorTypes.ParsingError:
            throw toUnexpectedError(err);
          case Errors.ErrorTypes.DomainError:
            throw toBadRequest(err);
          default:
            throw toUnexpectedError(err);
        }
      }

      throw toUnexpectedError(new Errors.UnexpectedError(err));
    });
  }

  @Post(AppUrls.questions)
  @UsePipes(new ZodValidationPipe(QuestionEntity.createQuestionDtoParser))
  async createQuestion(
    @Body() dto: QuestionEntity.CreateQuestionDto
  ): Promise<QuestionEntity.Question> {
    return this.questionService.createQuestion(dto).catch((err) => {
      if (Errors.isCustomError(err)) {
        switch (err.type) {
          case Errors.ErrorTypes.ParsingError:
            throw toUnexpectedError(err);
          case Errors.ErrorTypes.DomainError:
            throw toBadRequest(err);
          default:
            throw toUnexpectedError(err);
        }
      }

      throw toUnexpectedError(new Errors.UnexpectedError(err));
    });
  }

  @Put(AppUrls.questions)
  @UsePipes(new ZodValidationPipe(QuestionEntity.questionsParser))
  async updateQuestions(
    @Body() dto: QuestionEntity.Question[]
  ): Promise<QuestionEntity.Question[]> {
    return this.questionService.saveQuestions(dto).catch((err) => {
      if (Errors.isCustomError(err)) {
        switch (err.type) {
          case Errors.ErrorTypes.ParsingError:
            throw toUnexpectedError(err);
          case Errors.ErrorTypes.DomainError:
            throw toBadRequest(err);
          default:
            throw toUnexpectedError(err);
        }
      }

      throw toUnexpectedError(new Errors.UnexpectedError(err));
    });
  }

  @Put(AppUrls.question)
  @UsePipes(new ZodValidationPipe(QuestionEntity.questionParser))
  async updateQuestion(
    @Body() dto: QuestionEntity.Question
  ): Promise<QuestionEntity.Question> {
    return this.questionService.updateQuestion(dto).catch((err) => {
      if (Errors.isCustomError(err)) {
        switch (err.type) {
          case Errors.ErrorTypes.ParsingError:
            throw toUnexpectedError(err);
          case Errors.ErrorTypes.DomainError:
            throw toBadRequest(err);
          default:
            throw toUnexpectedError(err);
        }
      }

      throw toUnexpectedError(new Errors.UnexpectedError(err));
    });
  }

  @Delete(AppUrls.question)
  async deleteQuestion(
    @Param(UrlParams.QuestionId, IDParamPipe)
    questionId: QuestionEntity.Question['id']
  ): Promise<void> {
    return this.questionService.deleteQuestion(questionId).catch((err) => {
      if (Errors.isCustomError(err)) {
        switch (err.type) {
          case Errors.ErrorTypes.ParsingError:
            throw toUnexpectedError(err);
          case Errors.ErrorTypes.DomainError:
            throw toBadRequest(err);
          default:
            throw toUnexpectedError(err);
        }
      }

      throw toUnexpectedError(new Errors.UnexpectedError(err));
    });
  }
}
