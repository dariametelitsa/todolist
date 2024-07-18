import {
  ErrorResponseType,
  TaskStatuses,
  todolistAPI,
  TodoTaskPriorities,
  UpdateTaskModelType,
} from '../../../api/todolist-api'
import { AppThunkType } from '../../../app/store'
import { addTask, cleanTasksList, deleteTask, setTasks, updateTask } from '../redusers/tasksSlice'
import { setAppStatus } from '../../../app/reducers/appSlice'
import { handleServerAppError, handleServerNetworkError } from '../../../utils/errorUtils'
import { AxiosError } from 'axios'
import { changeEntityStatus } from '../redusers/todolistsSlice'

export enum STATUS_CODE {
  SUCCESS = 0,
  ERROR = 1,
  RECAPTCHA_ERROR = 10,
}

export const getTasksTC =
  (todolistId: string): AppThunkType =>
  (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    todolistAPI
      .getTasks(todolistId)
      .then((res) => {
        dispatch(setTasks({ todolistId: todolistId, tasks: res.data.items }))
      })
      .catch((e: AxiosError<ErrorResponseType>) => {
        console.log(e)
        dispatch(setTasks({ todolistId: todolistId, tasks: [] }))
      })
      .finally(() => {
        dispatch(setAppStatus({ status: 'idle' }))
      })
  }

export const deleteTaskTC =
  (todolistId: string, taskId: string): AppThunkType =>
  (dispatch) => {
    dispatch(changeEntityStatus({ id: todolistId, status: 'loading' }))
    todolistAPI
      .deleteTask(todolistId, taskId)
      .then(() => {
        dispatch(deleteTask({ todolistId: todolistId, taskId: taskId }))
      })
      .catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
        dispatch(changeEntityStatus({ id: todolistId, status: 'failed' }))
      })
      .finally(() => {
        dispatch(changeEntityStatus({ id: todolistId, status: 'idle' }))
      })
  }

export const addTaskTC =
  (todoId: string, title: string): AppThunkType =>
  (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    todolistAPI
      .addTask(todoId, title)
      .then((res) => {
        if (res.data.resultCode === STATUS_CODE.SUCCESS) {
          dispatch(addTask({ task: res.data.data.item }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
      })
      .finally(() => {
        dispatch(setAppStatus({ status: 'idle' }))
      })
  }

type UpdateDomainTaskModelType = {
  description?: string
  title?: string
  completed?: boolean
  status?: TaskStatuses
  priority?: TodoTaskPriorities
  startDate?: string
  deadline?: string
  addedDate?: string
}

export const updateTaskTC =
  (todolistId: string, taskId: string, model: UpdateDomainTaskModelType): AppThunkType =>
  (dispatch, getState) => {
    const task = getState().tasks[todolistId].find((t) => t.id === taskId)
    if (task) {
      const apiModel: UpdateTaskModelType = { ...task, ...model }
      dispatch(changeEntityStatus({ id: todolistId, status: 'loading' }))
      todolistAPI
        .updateTask(todolistId, taskId, apiModel)
        .then((res) => {
          dispatch(updateTask({ todolistId: todolistId, taskId: taskId, task: res.data.data.item }))
        })
        .catch((e) => {
          handleServerNetworkError(e, dispatch)
          dispatch(changeEntityStatus({ id: todolistId, status: 'failed' }))
        })
        .finally(() => {
          dispatch(changeEntityStatus({ id: todolistId, status: 'idle' }))
        })
    }
  }

export const cleanTasksListTC =
  (todolistId: string): AppThunkType =>
  async (dispatch, getState) => {
    const tasks = getState().tasks[todolistId]
    const requests = tasks.map((t) => todolistAPI.deleteTask(todolistId, t.id))
    Promise.all(requests)
      .then(() => dispatch(cleanTasksList({ todolistId: todolistId })))
      .catch((e) => {
        handleServerNetworkError(e, dispatch)
      })
  }
