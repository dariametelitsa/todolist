import { setAppStatus } from 'app/reducers/appSlice';
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError';
import { AppDispatch } from 'app/store';
import { BaseResponse } from 'common/types';

//type ThunkAPI = BaseThunkAPI<AppRootStateType, unknown, AppDispatch, BaseResponse | null>;
type ThunkAPI = any;
type RejectWithValue = (value: BaseResponse | null) => Promise<any>;

export const thunkTryCatch = async <T>(
  thunkAPI: ThunkAPI,
  logic: () => Promise<T>
): Promise<T | ReturnType<typeof rejectWithValue>> => {
  const rejectWithValue = thunkAPI.rejectWithValue as RejectWithValue;
  const dispatch = thunkAPI.dispatch as AppDispatch;
  dispatch(setAppStatus({ status: 'loading' }));
  try {
    return await logic();
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(setAppStatus({ status: 'idle' }));
  }
};
