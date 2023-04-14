export const UrlParams = {
  QuestionId: 'questionId',
} as const;

export const AppUrls = {
  questions: 'questions',
  question: `questions/:${UrlParams.QuestionId}`,
} as const;

export const buildUrlWithParams = (
  url: string,
  params: Record<string, unknown>
) => {
  return url
    .split('/')
    .map((elem) => {
      if (elem.startsWith(':')) {
        return params[elem.substring(1)];
      }
      return elem;
    })
    .join('/');
};
