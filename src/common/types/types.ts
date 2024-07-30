export type ActionTypeForTest<T extends (...args: any) => any> = Omit<ReturnType<T>, 'meta'>;

export type BaseResponse<T = {}> = {
  data: T;
  fieldsErrors?: [];
  messages: string[];
  resultCode: number;
};
