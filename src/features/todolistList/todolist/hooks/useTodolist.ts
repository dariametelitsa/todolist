import { store, useAppDispatch, useAppSelector } from '../../../../app/store'
import { TaskStatuses, TaskType } from '../../../../api/todolist-api'
import { useCallback, useEffect, useMemo } from 'react'
import { addTaskTC, cleanTasksListTC, getTasksTC } from '../../thunk/tasksThunks'
import { FilterValuesType } from '../../../../data/dataPropsTypes'
import { changedTodolistCover, changedTodolistFilter, clearTodolistsData } from '../../redusers/todolistsSlice'
import { changeTodolistTitleTC, deleteTodolistTC } from '../../thunk/todolistsThunks'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../../login/reduser/authSlice'
import { cleanTasksList } from '../../redusers/tasksSlice'

export const useTodolist = (id: string, filter: FilterValuesType) => {
  const tasks = useAppSelector<Array<TaskType>>((state) => state.tasks[id])
  //const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (store.getState().auth?.isLoggedIn) {
      dispatch(getTasksTC(id))
      // dispatch(setAppStatus({ status: 'idle' }))
      // dispatch(setTasks({ todolistId: id, tasks: [] }))
      // dispatch(setAppStatus({ status: 'idle' }))
    }
  }, [dispatch, id, isLoggedIn])

  const filteredTasks = useMemo(() => {
    if (filter === 'active') {
      return tasks.filter((t) => t.status !== TaskStatuses.Completed)
    }
    if (filter === 'completed') {
      return tasks.filter((t) => t.status === TaskStatuses.Completed)
    }
    return tasks
  }, [tasks, filter])

  const sorterTasks = useMemo(() => {
    return [...filteredTasks].sort((prev, next) => {
      if (next.status === TaskStatuses.Completed && prev.status !== TaskStatuses.Completed) return -1
      if (next.status !== TaskStatuses.Completed && prev.status === TaskStatuses.Completed) return 1
      return 0
    })
  }, [filteredTasks])

  const onClickFilterHandlerCreator = useCallback(
    (filter: FilterValuesType) => {
      return () => dispatch(changedTodolistFilter({ id: id, filter: filter }))
    },
    [dispatch, id]
  )

  const onClickHandlerDeleteAllTasks = useCallback(() => {
    dispatch(cleanTasksListTC(id))
  }, [dispatch, id])

  const addItemHandler = useCallback(
    (title: string) => {
      dispatch(addTaskTC(id, title))
    },
    [dispatch, id]
  )

  const onChangeCoverHandler = useCallback(
    (image: string) => {
      dispatch(changedTodolistCover({ id: id, coverImage: image }))
    },
    [dispatch, id]
  )

  const changeTodolistTitleHandler = useCallback(
    (todolistId: string, newTitle: string) => {
      dispatch(changeTodolistTitleTC(todolistId, newTitle))
    },
    [dispatch]
  )

  const deleteTodolistHandler = () => {
    dispatch(deleteTodolistTC(id))
  }

  // const onChangeTitleTaskHandler = useCallback((taskId: string, newTitle: string) => {
  //     dispatch(renameTaskTitleAC(id, taskId, newTitle));
  // }, [dispatch, id]);
  //
  // const onChangeSetTaskStatusHandler = useCallback((taskId: string, newStatus: boolean) => {
  //     dispatch(setNewTaskStatusAC(id, taskId, newStatus));
  // }, [dispatch, id]);
  //
  // const deleteTaskHandler = useCallback((taskId: string) => {
  //     dispatch(removeTaskAC(id, taskId));
  // }, [dispatch, id]);

  return {
    dispatch,
    sorterTasks,
    onClickFilterHandlerCreator,
    onClickHandlerDeleteAllTasks,
    addItemHandler,
    onChangeCoverHandler,
    changeTodolistTitleHandler,
    deleteTodolistHandler,
  }
}
