export type ActionTypeForTest<T extends (...args: any) => any> = Omit<ReturnType<T>, 'meta'>;

export type BaseResponse<T = {}> = {
  data: T;
  fieldsErrors?: Array<{ field: string; error: string }>;
  messages: string[];
  resultCode: number;
};
