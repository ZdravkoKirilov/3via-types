import { Errors } from '@3via/core';

// could translate errors here. Error cases are just examples
export const toErrorMessage = (err: Errors.CustomError) => {
  switch (err.type) {
    case Errors.ErrorTypes.UnexpectedError:
      return 'Something went wrong.';
    case Errors.ErrorTypes.DomainError: {
      switch (err.message) {
        case Errors.ErrorMessages.RepositoryError:
          return 'Repository error.';
        case Errors.ErrorMessages.InvalidAction:
          return 'Invalid action.';
        default:
          return 'Something went wrong.';
      }
    }
    case Errors.ErrorTypes.ParsingError:
      return 'Invalid fields.';
  }
};
