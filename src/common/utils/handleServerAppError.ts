import { Dispatch } from 'redux';
import { setAppError, setAppStatus } from 'app/reducers/appSlice';
import { BaseResponse } from 'common/types';

/**
 *
 * @param data - text information about the error that occurred
 * @param dispatch - dispatch function
 * @param isShowGlobalError - should app shows global error
 * @returns void
 */
export const handleServerAppError = <D>(
  data: BaseResponse<D>,
  dispatch: Dispatch,
  isShowGlobalError: boolean = true
) => {
  if (isShowGlobalError) {
    dispatch(setAppError({ error: data.messages[0] || 'Some error occurred' }));
    dispatch(setAppStatus({ status: 'failed' }));
  }
};
