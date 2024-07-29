import { ResponseType } from '../api/todolist-api';
import { setAppError, setAppStatus } from '../app/reducers/appSlice';
import { Dispatch } from 'redux';
import axios from 'axios';

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
  // if (data.messages.length) {
  //   dispatch(setAppErrorAC(data.messages[0]))
  // } else {
  //   dispatch(setAppErrorAC('Some error occurred'))
  // }
  dispatch(setAppError({ error: data.messages[0] || 'Some error occurred' }));
  dispatch(setAppStatus({ status: 'failed' }));
};

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage = 'Some error occurred';

  // ❗Проверка на наличие axios ошибки
  if (axios.isAxiosError(error)) {
    // ⏺️ err.response?.data?.message - например получение тасок с невалидной todolistId
    // ⏺️ err?.message - например при создании таски в offline режиме
    errorMessage = error.response?.data?.message || error?.message || errorMessage;
    // ❗ Проверка на наличие нативной ошибки
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`;
    // ❗Какой-то непонятный кейс
  } else {
    errorMessage = JSON.stringify(error);
  }

  dispatch(setAppError({ error: errorMessage }));
  dispatch(setAppStatus({ status: 'failed' }));
};
