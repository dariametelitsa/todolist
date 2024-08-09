import { useAppDispatch, useAppSelector } from 'app/store';
import { useCallback, useMemo } from 'react';
import { FilterValuesType } from 'common/data/dataPropsTypes';
import {
  changedTodolistCover,
  changedTodolistFilter,
  changeTodolistTitle,
  deleteTodolist,
} from 'features/todolistList/model/todolistsSlice';
import { addTask, cleanTasksList, makeSelectFilteredTasks } from 'features/todolistList/model/tasksSlice';
import { TaskStatuses } from 'common/enums';
import { bindActionCreators } from 'redux';

export const useTodolist = (id: string, filter: FilterValuesType) => {
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

  const changeFilterHandler = useCallback(
    (filter: FilterValuesType) => {
      //const cb = bindActionCreators({ changedTodolistFilter }, dispatch);
      return () => dispatch(changedTodolistFilter({ id: id, filter: filter }));
    },
    [dispatch, id]
  );

  const deleteAllTasksHandler = useCallback(() => {
    dispatch(cleanTasksList(id));
  }, [dispatch, id]);

  const addItemHandler = useCallback(
    (title: string) => {
      dispatch(addTask({ todolistId: id, title }));
    },
    [dispatch, id]
  );

  const changeCoverHandler = useCallback(
    (image: string) => {
      dispatch(changedTodolistCover({ id: id, coverImage: image }));
    },
    [dispatch, id]
  );

  const changeTodolistTitleHandler = useCallback(
    (todolistId: string, title: string) => {
      dispatch(changeTodolistTitle({ todolistId, title }));
    },
    [dispatch]
  );

  const deleteTodolistHandler = () => {
    dispatch(deleteTodolist(id));
  };

  return {
    dispatch,
    sorterTasks,
    changeFilterHandler,
    deleteAllTasksHandler,
    addItemHandler,
    changeCoverHandler,
    changeTodolistTitleHandler,
    deleteTodolistHandler,
  };
};
