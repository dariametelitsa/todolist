import { useAppDispatch, useAppSelector } from 'app/store';
import { useCallback, useMemo } from 'react';
import { FilterValues } from 'common/data/dataPropsTypes';
import { changedTodolistCover } from 'features/todolistList/model/todolistsSlice';
import { addTask, cleanTasksList, makeSelectFilteredTasks } from 'features/todolistList/model/tasksSlice';
import { TaskStatuses } from 'common/enums';
import { bindActionCreators } from 'redux';

export const useTodolist = (id: string, filter: FilterValues) => {
  //const tasks = useAppSelector((state) => selectTasksByTd(state, id));
  //const tasks = useSelector((state) => selectTasksForTodolist(state, id));
  const filteredTasks = useAppSelector((state) => makeSelectFilteredTasks(state, id, filter));
  const dispatch = useAppDispatch();

  const sorterTasks = useMemo(() => {
    return [...filteredTasks].sort((prev, next) => {
      if (next.status === TaskStatuses.Completed && prev.status !== TaskStatuses.Completed) return -1;
      if (next.status !== TaskStatuses.Completed && prev.status === TaskStatuses.Completed) return 1;
      return 0;
    });
  }, [filteredTasks]);

  const deleteAllTasksHandler = useCallback(() => {
    dispatch(cleanTasksList(id));
  }, [dispatch, id]);

  const addItemHandler = useCallback(
    (title: string) => {
      return dispatch(addTask({ todolistId: id, title }));
    },
    [dispatch, id]
  );

  const changeCoverHandler = useCallback(
    (image: string) => {
      dispatch(changedTodolistCover({ id: id, coverImage: image }));
    },
    [dispatch, id]
  );

  return {
    dispatch,
    sorterTasks,
    deleteAllTasksHandler,
    addItemHandler,
    changeCoverHandler,
  };
};
