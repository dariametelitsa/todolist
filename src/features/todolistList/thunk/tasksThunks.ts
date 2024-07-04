import {
  ErrorResponseType,
  TaskStatuses,
  todolistAPI,
  TodoTaskPriorities,
  UpdateTaskModelType,
} from '../../../api/todolist-api'
import { AppThunkType } from '../../../app/store'
import { addTaskAC, cleanTasksListAC, deleteTaskAC, setTasksAC, updateTaskAC } from '../redusers/tasksReduser'
import { setAppStatusAC } from '../../../app/reducers/appReducer'
import { handleServerAppError, handleServerNetworkError } from '../../../utils/errorUtils'
import { AxiosError } from 'axios'

export enum STATUS_CODE {
  SUCCESS = 0,
  ERROR = 1,
  RECAPTCHA_ERROR = 10,
}

export const getTasksTC =
  (todolistId: string): AppThunkType =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI
      .getTasks(todolistId)
      .then((res) => {
        dispatch(setTasksAC(todolistId, res.data.items))
      })
      .catch((e: AxiosError<ErrorResponseType>) => {
        console.log(e)
        dispatch(setTasksAC(todolistId, []))
      })
      .finally(() => {
        dispatch(setAppStatusAC('idle'))
      })
  }

export const deleteTaskTC =
  (todolistId: string, taskId: string): AppThunkType =>
  (dispatch) => {
    todolistAPI
      .deleteTask(todolistId, taskId)
      .then(() => {
        dispatch(deleteTaskAC(todolistId, taskId))
      })
      .catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
      })
  }

export const addTaskTC =
  (todoId: string, title: string): AppThunkType =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI
      .addTask(todoId, title)
      .then((res) => {
        if (res.data.resultCode === STATUS_CODE.SUCCESS) {
          dispatch(addTaskAC(res.data.data.item))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
      })
      .finally(() => {
        dispatch(setAppStatusAC('idle'))
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
  (todoId: string, taskId: string, model: UpdateDomainTaskModelType): AppThunkType =>
  (dispatch, getState) => {
    const task = getState().tasks[todoId].find((t) => t.id === taskId)
    if (task) {
      const apiModel: UpdateTaskModelType = { ...task, ...model }
      todolistAPI
        .updateTask(todoId, taskId, apiModel)
        .then((res) => {
          dispatch(updateTaskAC(todoId, taskId, res.data.data.item))
        })
        .catch((e) => {
          handleServerNetworkError(e, dispatch)
        })
    }
  }

export const cleanTasksListTC =
  (todolistId: string): AppThunkType =>
  async (dispatch, getState) => {
    const tasks = getState().tasks[todolistId]
    const requests = tasks.map((t) => todolistAPI.deleteTask(todolistId, t.id))
    Promise.all(requests)
      .then(() => dispatch(cleanTasksListAC(todolistId)))
      .catch((e) => {
        handleServerNetworkError(e, dispatch)
      })
  }
