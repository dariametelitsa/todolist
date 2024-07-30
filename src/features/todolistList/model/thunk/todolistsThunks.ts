import { AppThunkType } from '../../../../app/store';
import { todolistAPI } from '../../todolistAPI/todolist-api';
import { setTodolists } from '../todolistsSlice';
import { setAppStatus } from '../../../../app/reducers/appSlice';
import { handleServerNetworkError } from '../../../../common/utils/handleServerNetworkError';
import { fetchTasks } from '../tasksSlice';

// export const fetchTodolists = createAsyncThunk('')

export const getTodolistsTC = (): AppThunkType<Promise<void>> => async (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  try {
    const todolists = await todolistAPI.getTodolist();
    dispatch(setTodolists({ todolists: todolists.data }));
    dispatch(setAppStatus({ status: 'succeeded' }));
    todolists.data.forEach((tl) => {
      dispatch(fetchTasks(tl.id));
    });
  } catch (e: any) {
    dispatch(setTodolists({ todolists: [] }));
    handleServerNetworkError(e, dispatch);
  } finally {
    dispatch(setAppStatus({ status: 'idle' }));
  }
};

// export const addTodolistTC =
//   (title: string): AppThunkType<Promise<void>> =>
//   async (dispatch) => {
//     dispatch(setAppStatus({ status: 'loading' }));
//     try {
//       const todoRes = await todolistAPI.addTodolist(title);
//       dispatch(addTodolist({ todolist: todoRes.data.data.item }));
//       //const taskRes = await todolistAPI.getTasks(todoRes.data.data.item.id)
//       //dispatch(setTasks({ todolistId: todoRes.data.data.item.id, tasks: taskRes.data.items }))
//     } catch (e: unknown) {
//       if (axios.isAxiosError<ErrorResponseType>(e)) {
//         // handleServerNetworkError(e as AxiosError<ErrorResponseType>, dispatch)
//         handleServerNetworkError(e, dispatch);
//       } else {
//         dispatch(setAppError({ error: (e as Error).message }));
//       }
//     }
//     dispatch(setAppStatus({ status: 'idle' }));
//   };

// export const deleteTodolistTC =
//   (todolistId: string): AppThunkType =>
//   (dispatch) => {
//     dispatch(changeEntityStatus({ id: todolistId, status: 'loading' }));
//     dispatch(setAppStatus({ status: 'loading' }));
//     todolistAPI
//       .deleteTodolist(todolistId)
//       .then((res) => {
//         if (res.data.resultCode === STATUS_CODE.SUCCESS) {
//           dispatch(deleteTodolist({ id: todolistId }));
//           dispatch(setAppStatus({ status: 'succeeded' }));
//         } else {
//           handleServerAppError(res.data, dispatch);
//           dispatch(changeEntityStatus({ id: todolistId, status: 'failed' }));
//         }
//       })
//       .catch((e) => {
//         handleServerNetworkError(e, dispatch);
//         dispatch(changeEntityStatus({ id: todolistId, status: 'failed' }));
//       })
//       .finally(() => {
//         dispatch(setAppStatus({ status: 'idle' }));
//       });
//   };

// export const changeTodolistTitleTC =
//   (todolistId: string, title: string): AppThunkType =>
//   (dispatch) => {
//     dispatch(setAppStatus({ status: 'loading' }));
//     dispatch(changeEntityStatus({ id: todolistId, status: 'loading' }));
//     todolistAPI
//       .updateTodolist(todolistId, title)
//       .then(() => {
//         dispatch(changeTodolistTitle({ id: todolistId, title: title }));
//         dispatch(setAppStatus({ status: 'succeeded' }));
//       })
//       .catch((e) => {
//         handleServerNetworkError(e, dispatch);
//         dispatch(changeEntityStatus({ id: todolistId, status: 'failed' }));
//       })
//       .finally(() => {
//         dispatch(setAppStatus({ status: 'idle' }));
//         dispatch(changeEntityStatus({ id: todolistId, status: 'idle' }));
//       });
//   };
