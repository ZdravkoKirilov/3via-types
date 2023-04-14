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

import { QuestionEntity } from '@3via/core';
import { toErrorMessage, useQuestions } from '../helpers';
import { UpsertQuestionForm } from '../shared';

export const useEditQuestion = () => {
  const { editQuestion } = useQuestions();

  const [selectedQuestion, toggleSelectedQuestion] = useState<
    QuestionEntity.Question | undefined
  >(undefined);

  const handleEditQuestion = (dto: QuestionEntity.CreateQuestionDto) => {
    if (selectedQuestion) {
      editQuestion.mutate(
        {
          ...selectedQuestion,
          ...dto,
        },
        {
          onSuccess: () => {
            toggleSelectedQuestion(undefined);
          },
        }
      );
    }
  };

  return {
    editQuestion: (question: QuestionEntity.Question) =>
      toggleSelectedQuestion(question),

    EditQuestionUI: (
      <Dialog open={!!selectedQuestion} fullWidth>
        <DialogTitle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>Edit question</Typography>
            <IconButton
              aria-label="Close form"
              onClick={() => toggleSelectedQuestion(undefined)}
            >
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Box p={2}>
            <UpsertQuestionForm
              isLoading={editQuestion.isLoading}
              error={
                editQuestion.error ? toErrorMessage(editQuestion.error) : ''
              }
              onSubmit={handleEditQuestion}
              question={selectedQuestion}
            />
          </Box>
        </DialogContent>
      </Dialog>
    ),
  };
};
