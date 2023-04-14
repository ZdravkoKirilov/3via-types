export type Tagged<T extends string, U> = U & { readonly __tag: T };

const tag = <Value, Tag extends string>(tag: Tag, value: Value) =>
  value as Tagged<typeof tag, Value>;

export const Tagged = { tag };
