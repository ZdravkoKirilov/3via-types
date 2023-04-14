import { Alert } from '@mui/material';

import { QuestionEntity } from '@3via/core';
import { useQuestions } from '../helpers';
import { ToggleSnackbar } from '../shared';

export const useMoveQuestion = (
  currentQuestions: QuestionEntity.Question[]
) => {
  const { saveQuestions } = useQuestions();

  const moveQuestion = (direction: 'up' | 'down', currentIndex: number) => {
    const reorderedQuestions = QuestionEntity.moveQuestion(
      direction,
      currentIndex,
      currentQuestions
    );

    saveQuestions.mutate(reorderedQuestions);
  };

  return {
    moveQuestion,
    isUpdatingQuestions: saveQuestions.isLoading,
    FeedbackUI: (
      <>
        <ToggleSnackbar open={saveQuestions.isSuccess}>
          <Alert severity="success">Questions updated.</Alert>
        </ToggleSnackbar>

        <ToggleSnackbar open={saveQuestions.isError}>
          <Alert severity="error">Couldn't update questions.</Alert>
        </ToggleSnackbar>
      </>
    ),
  };
};
