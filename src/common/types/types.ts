export type ActionTypeForTest<T extends (...args: any) => any> = Omit<ReturnType<T>, 'meta'>;

export type BaseResponse<T = {}> = {
  data: T;
  fieldsErrors: FieldErrorType[];
  messages: string[];
  resultCode: number;
};

export type FieldErrorType = {
  error: string;
  field: string;
};
