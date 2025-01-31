import { AppDispatch } from 'app/store';
import { AppStatus } from 'app/model/appSlice';
import { todolistApi } from 'features/todolistList/api/todolistAPI';

export const updateQueryData = (dispatch: AppDispatch, todoId: string, status: AppStatus) => {
  return dispatch(
    todolistApi.util.updateQueryData('getTodolist', undefined, (state) => {
      const index = state.findIndex((td) => td.id === todoId);
      if (index !== -1) {
        state[index].entityStatus = status;
      }
    })
  );
};
