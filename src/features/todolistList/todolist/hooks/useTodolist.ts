import { useAppDispatch } from '../../../../app/store';
import { useCallback, useMemo } from 'react';
import { FilterValuesType } from '../../../../common/data/dataPropsTypes';
import {
  changedTodolistCover,
  changedTodolistFilter,
  changeTodolistTitle,
  deleteTodolist,
} from '../../model/todolistsSlice';
import { useSelector } from 'react-redux';
import { addTask, cleanTasksList, selectTasksForTodolist } from '../../model/tasksSlice';
import { TaskStatuses } from '../../../../common/enums/enums';

export const useTodolist = (id: string, filter: FilterValuesType) => {
  const tasks = useSelector((state) => selectTasksForTodolist(state, id));
  const dispatch = useAppDispatch();

  //const isLoggedIn = useSelector(selectIsLoggedIn)
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     dispatch(getTasksTC(id))
  //   }
  // }, [dispatch, id, isLoggedIn])

  const filteredTasks = useMemo(() => {
    if (filter === 'active') {
      return tasks.filter((t) => t.status !== TaskStatuses.Completed);
    }
    if (filter === 'completed') {
      return tasks.filter((t) => t.status === TaskStatuses.Completed);
    }
    return tasks;
  }, [tasks, filter]);

  const sorterTasks = useMemo(() => {
    return [...filteredTasks].sort((prev, next) => {
      if (next.status === TaskStatuses.Completed && prev.status !== TaskStatuses.Completed) return -1;
      if (next.status !== TaskStatuses.Completed && prev.status === TaskStatuses.Completed) return 1;
      return 0;
    });
  }, [filteredTasks]);

  const onClickFilterHandlerCreator = useCallback(
    (filter: FilterValuesType) => {
      return () => dispatch(changedTodolistFilter({ id: id, filter: filter }));
    },
    [dispatch, id]
  );

  const onClickHandlerDeleteAllTasks = useCallback(() => {
    dispatch(cleanTasksList(id));
  }, [dispatch, id]);

  const addItemHandler = useCallback(
    (title: string) => {
      dispatch(addTask({ todolistId: id, title }));
    },
    [dispatch, id]
  );

  const onChangeCoverHandler = useCallback(
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
    onClickFilterHandlerCreator,
    onClickHandlerDeleteAllTasks,
    addItemHandler,
    onChangeCoverHandler,
    changeTodolistTitleHandler,
    deleteTodolistHandler,
  };
};
