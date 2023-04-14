import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useFormResolver } from '../helpers';
import { QuestionEntity } from '@3via/core';

type Props = {
  isLoading: boolean;
  onSubmit: (payload: QuestionEntity.CreateQuestionDto) => void;
  error?: string;
  question?: QuestionEntity.Question;
};

export const UpsertQuestionForm: FC<Props> = ({
  isLoading,
  error,
  question,
  onSubmit,
}) => {
  const formResolver = useFormResolver(
    QuestionEntity.createQuestionDtoParser.safeParse
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionEntity.CreateQuestionDto>({
    defaultValues: question,
    resolver: formResolver,
  });

  const onSubmitHandler = (payload: QuestionEntity.CreateQuestionDto) => {
    onSubmit(payload);
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmitHandler)} gap={3}>
      <TextField
        fullWidth
        aria-required
        id="title"
        name="title"
        label="Title"
        inputProps={{ ...register('title', { required: true }) }}
        helperText={errors.title?.message || ''}
        error={!!errors.title?.message}
        aria-invalid={!!errors.title?.message}
      />

      <TextField
        fullWidth
        id="hint"
        name="hint"
        multiline
        minRows={2}
        label="Hint"
        inputProps={{ ...register('hint') }}
        helperText={errors.hint?.message || ''}
        error={!!errors.hint?.message}
        aria-invalid={!!errors.hint?.message}
      />

      <LoadingButton loading={isLoading} variant="contained" type="submit">
        Submit
      </LoadingButton>

      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  );
};
