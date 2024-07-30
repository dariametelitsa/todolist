import { setAppError, setAppStatus } from '../../app/reducers/appSlice';
import { Dispatch } from 'redux';
import axios from 'axios';

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage = 'Some error occurred';

  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data?.message || error?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`;
  } else {
    errorMessage = JSON.stringify(error);
  }
  dispatch(setAppError({ error: errorMessage }));
  dispatch(setAppStatus({ status: 'failed' }));
};
