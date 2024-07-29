import { ResponseType } from '../api/todolist-api';
import { Dispatch } from 'redux';
import { setAppError, setAppStatus } from '../app/reducers/appSlice';

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
  dispatch(setAppError({ error: data.messages[0] || 'Some error occurred' }));
  dispatch(setAppStatus({ status: 'failed' }));
};
