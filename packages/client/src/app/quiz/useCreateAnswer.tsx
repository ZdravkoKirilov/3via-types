import { useState } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';

import { AnswerEntity, QuestionEntity } from '@3via/core';
import { toErrorMessage, useQuestions } from '../helpers';
import { CreateAnswerForm } from '../shared';

export const useCreateAnswer = () => {
  const { editQuestion } = useQuestions();
  const [pendingAnswer, setPendingAnswer] = useState<
    QuestionEntity.Question | undefined
  >(undefined);

  const handleAddAnswer = (answer: AnswerEntity.CreateAnswerDto) => {
    if (pendingAnswer) {
      const updatedQuestion = QuestionEntity.addAnswer(answer, pendingAnswer);

      editQuestion.mutate(updatedQuestion, {
        onSuccess: () => {
          setPendingAnswer(undefined);
        },
      });
    }
  };

  return {
    showAnswerForm: (question: QuestionEntity.Question) =>
      setPendingAnswer(question),

    CreateAnswerUI: (
      <Dialog open={!!pendingAnswer} fullWidth>
        <DialogTitle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>Add answer</Typography>
            <IconButton
              aria-label="Close form"
              onClick={() => setPendingAnswer(undefined)}
            >
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Box p={2}>
            <CreateAnswerForm
              isLoading={editQuestion.isLoading}
              error={
                editQuestion.error ? toErrorMessage(editQuestion.error) : ''
              }
              onSubmit={handleAddAnswer}
            />
          </Box>
        </DialogContent>
      </Dialog>
    ),
  };
};
