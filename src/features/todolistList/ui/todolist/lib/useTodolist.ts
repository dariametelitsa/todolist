import { useAppDispatch } from 'app/store';
import { useCallback, useMemo, useState } from 'react';
import { FilterValues } from 'common/data/dataPropsTypes';
import { changedTodolistCover } from 'features/todolistList/model/todolistsSlice';
import { TaskStatuses } from 'common/enums';
import {
  PageSize,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTaskQuery,
} from 'features/todolistList/api/taskAPI';
import { useSelector } from 'react-redux';
import { todolistApi } from 'features/todolistList/api/todolistAPI';
import { updateQueryData } from 'features/todolistList/model/updateQueryData';

export const useTodolist = (id: string, filter: FilterValues) => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetTaskQuery(
    { todolistId: id, args: { page: 1, count: 4 } },
    {
      // selectFromResult: (res) => ({
      //   tasks: res.data?.items,
      // }),
    }
  );
  const tasks = data?.items;
  const [addTask] = useAddTaskMutation();
  const [deleteTask, { isLoading: isLoadingDelete }] = useDeleteTaskMutation();
  const [page, setPage] = useState(1);

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
  const totalCount = data?.totalCount || 0;
  const isPaginationShown = totalCount / PageSize > 1;

  if (todo) {
    if (todo.filter === 'active') {
      filterTasks = sorterTasks.filter((task) => task.status === TaskStatuses.New);
    }

    if (todo.filter === 'completed') {
      filterTasks = sorterTasks.filter((task) => task.status === TaskStatuses.Completed);
    }
  }

  const deleteAllTasksHandler = useCallback(async () => {
    if (tasks) {
      updateQueryData(dispatch, id, 'loading');
      const requests = tasks?.map((t) => deleteTask({ todolistId: id, taskId: t.id }));
      await Promise.all(requests);
      updateQueryData(dispatch, id, 'idle');
    }
  }, [deleteTask, id, tasks, dispatch]);

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
    isLoadingDelete,
    isLoading,
    dispatch,
    filterTasks,
    deleteAllTasksHandler,
    addItemHandler,
    changeCoverHandler,
    totalCount,
    page,
    setPage,
    isPaginationShown,
  };
};
