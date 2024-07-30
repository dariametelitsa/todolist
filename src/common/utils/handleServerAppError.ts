import { Dispatch } from 'redux';
import { setAppError, setAppStatus } from '../../app/reducers/appSlice';
import { BaseResponse } from '../types/types';

export const handleServerAppError = <D>(data: BaseResponse<D>, dispatch: Dispatch) => {
  dispatch(setAppError({ error: data.messages[0] || 'Some error occurred' }));
  dispatch(setAppStatus({ status: 'failed' }));
};
