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

export const useCreateQuestion = () => {
  const { addQuestion } = useQuestions();
  const [visibleCreateForm, toggleCreateForm] = useState(false);

  const handleAddQuestion = (dto: QuestionEntity.CreateQuestionDto) => {
    addQuestion.mutate(dto, {
      onSuccess: () => {
        toggleCreateForm(false);
      },
    });
  };

  return {
    createQuestion: () => toggleCreateForm(true),

    CreateQuestionUI: (
      <Dialog open={visibleCreateForm} fullWidth>
        <DialogTitle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>Create a new question</Typography>
            <IconButton
              aria-label="Close form"
              onClick={() => toggleCreateForm(false)}
            >
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Box p={2}>
            <UpsertQuestionForm
              isLoading={addQuestion.isLoading}
              error={addQuestion.error ? toErrorMessage(addQuestion.error) : ''}
              onSubmit={handleAddQuestion}
            />
          </Box>
        </DialogContent>
      </Dialog>
    ),
  };
};
