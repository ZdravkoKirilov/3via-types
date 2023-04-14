import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { QuestionEntity } from '@3via/core';

let questions: QuestionEntity.Question[] = [
  {
    id: uuid(),
    title: 'What is the maximum weight of a male African elephant?',
    hint: 'About 35 tigers',
    answers: [
      {
        id: uuid(),
        title: '1000 kg',
        points: 0,
      },
      {
        id: uuid(),
        title: '2000 kg',
        points: 5,
      },
      {
        id: uuid(),
        title: '4300 kg',
        points: 20,
      },
      {
        id: uuid(),
        title: '6300 kg',
        points: 50,
      },
    ],
  },
  {
    id: uuid(),
    title: 'How many hours a day do domestic cats spend sleeping?',
    hint: 'More than 2 humans',
    answers: [
      {
        id: uuid(),
        title: 'Up to 10 hours',
        points: 0,
      },
      {
        id: uuid(),
        title: 'Between 10 and 15 hours',
        points: 5,
      },
      {
        id: uuid(),
        title: 'Between 16 and 20 hours',
        points: 20,
      },
    ],
  },
] as QuestionEntity.Question[];

@Injectable()
export class QuestionsService {
  async getQuestions() {
    return questions;
  }

  async deleteQuestion(id: QuestionEntity.Question['id']) {
    questions = questions.filter((question) => question.id !== id);

    return undefined;
  }

  async updateQuestion(updatedQuestion: QuestionEntity.Question) {
    questions = questions.map((question) =>
      question.id === updatedQuestion.id ? updatedQuestion : question
    );

    return updatedQuestion;
  }

  async saveQuestions(reorderedQuestions: QuestionEntity.Question[]) {
    questions = reorderedQuestions;

    return questions;
  }

  async createQuestion(dto: QuestionEntity.CreateQuestionDto) {
    const newQuestion = QuestionEntity.create(dto);

    questions.push(newQuestion);

    return newQuestion;
  }
}
