import { setAppStatus } from 'app/reducers/appSlice';
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError';
import { AppDispatch } from 'app/store';

//type ThunkAPI = BaseThunkAPI<AppRootStateType, unknown, AppDispatch, BaseResponse | null>;
type ThunkAPI = any;

export const thunkTryCatch = async <T>(
  thunkAPI: ThunkAPI,
  logic: () => Promise<T>
): Promise<T | ReturnType<typeof rejectWithValue>> => {
  //const { dispatch, rejectWithValue } = thunkAPI;
  const rejectWithValue = thunkAPI.rejectWithValue;
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
