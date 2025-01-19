export type StringNumber = `${number}`;
export type StringBoolean = `${boolean}`;

export type ExtractUnionStrict<T, U extends T> = Extract<T, U>;
export type ExcludeUnionStrict<T, U extends T> = Exclude<T, U>;
