import { BaseResponse } from 'common/types';

//type ThunkAPI = BaseThunkAPI<AppRootStateType, unknown, AppDispatch, BaseResponse | null>;
type ThunkAPI = any;
type RejectWithValue = (value: BaseResponse | unknown) => Promise<any>;

export const thunkTryCatch = async <T>(
  thunkAPI: ThunkAPI,
  logic: () => Promise<T>
): Promise<T | ReturnType<typeof rejectWithValue>> => {
  const rejectWithValue = thunkAPI.rejectWithValue as RejectWithValue;
  //const dispatch = thunkAPI.dispatch as AppDispatch;
  try {
    return await logic();
  } catch (error) {
    //handleServerNetworkError(error, dispatch);
    //return rejectWithValue(error);
  }
};
