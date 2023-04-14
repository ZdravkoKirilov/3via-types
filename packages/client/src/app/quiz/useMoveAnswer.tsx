import { Alert } from '@mui/material';

import { QuestionEntity } from '@3via/core';
import { useQuestions } from '../helpers';
import { ToggleSnackbar } from '../shared';

export const useMoveAnswer = () => {
  const { editQuestion } = useQuestions();

  const moveAnswer = (
    direction: 'up' | 'down',
    currentIndex: number,
    question: QuestionEntity.Question
  ) => {
    const updatedQuestion = QuestionEntity.moveAnswer(
      direction,
      currentIndex,
      question
    );

    editQuestion.mutate(updatedQuestion);
  };

  return {
    moveAnswer,
    activeQuestion: editQuestion.isLoading ? editQuestion.variables?.id : null,
    FeedbackUI: (
      <>
        <ToggleSnackbar open={editQuestion.isSuccess}>
          <Alert severity="success">Answers updated.</Alert>
        </ToggleSnackbar>

        <ToggleSnackbar open={editQuestion.isError}>
          <Alert severity="error">Couldn't update answers.</Alert>
        </ToggleSnackbar>
      </>
    ),
  };
};
