import { setAppStatus } from 'app/reducers/appSlice';
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError';

export const thunkTryCatch = async (thunkAPI: any, logic: () => Promise<any>) => {
  const { dispatch, rejectWithValue } = thunkAPI;
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
