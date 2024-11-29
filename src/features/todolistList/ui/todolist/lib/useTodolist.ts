import { useAppDispatch } from 'app/store';
import { useCallback, useMemo } from 'react';
import { FilterValues } from 'common/data/dataPropsTypes';
import { changedTodolistCover } from 'features/todolistList/model/todolistsSlice';
import { cleanTasksList } from 'features/todolistList/model/tasksSlice';
import { TaskStatuses } from 'common/enums';
import { useAddTaskMutation, useGetTaskQuery } from 'features/todolistList/api/taskAPI';
import { useSelector } from 'react-redux';
import { todolistApi } from 'features/todolistList/api/todolistAPI';

export const useTodolist = (id: string, filter: FilterValues) => {
  const dispatch = useAppDispatch();
  const { tasks } = useGetTaskQuery(id, {
    selectFromResult: (res) => ({
      tasks: res.data?.items,
    }),
  });
  const [addTask] = useAddTaskMutation();

  const sorterTasks = useMemo(() => {
    const tasksForTodolist = tasks ?? [];
    return [...tasksForTodolist].sort((prev, next) => {
      if (next.status === TaskStatuses.Completed && prev.status !== TaskStatuses.Completed) return -1;
      if (next.status !== TaskStatuses.Completed && prev.status === TaskStatuses.Completed) return 1;
      return 0;
    });
  }, [tasks]);

  const todolists = useSelector(todolistApi.endpoints.getTodolist.select());
  const todo = todolists.data?.find((td) => td.id === id);
  let filterTasks = sorterTasks;

  if (todo) {
    if (todo.filter === 'active') {
      filterTasks = sorterTasks.filter((task) => task.status === TaskStatuses.New);
    }

    if (todo.filter === 'completed') {
      filterTasks = sorterTasks.filter((task) => task.status === TaskStatuses.Completed);
    }
  }

  const deleteAllTasksHandler = useCallback(() => {
    dispatch(cleanTasksList(id));
  }, [dispatch, id]);

  const addItemHandler = useCallback(
    (title: string) => {
      return addTask({ todolistId: id, title });
    },
    [id, addTask]
  );

  const changeCoverHandler = useCallback(
    (image: string) => {
      dispatch(changedTodolistCover({ id: id, coverImage: image }));
    },
    [dispatch, id]
  );

  return {
    dispatch,
    filterTasks,
    deleteAllTasksHandler,
    addItemHandler,
    changeCoverHandler,
  };
};
