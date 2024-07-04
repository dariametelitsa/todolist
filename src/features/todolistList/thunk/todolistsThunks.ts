import { AppThunkType } from '../../../app/store'
import { ErrorResponseType, todolistAPI } from '../../../api/todolist-api'
import {
  addTodolistAC,
  changeEntityStatusAC,
  changeTodolistTitleAC,
  deleteTodolistAC,
  setTodolistsAC,
} from '../redusers/todolistsReducer'
import { setTasksAC } from '../redusers/tasksReduser'
import { setAppErrorAC, setAppStatusAC } from '../../../app/reducers/appReducer'
import { handleServerNetworkError } from '../../../utils/errorUtils'
import axios, { AxiosError } from 'axios'

export const getTodolistsTC = (): AppThunkType => async (dispatch) => {
  try {
    const res = await todolistAPI.getTodolist()
    dispatch(setTodolistsAC(res.data))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e: any) {
    dispatch(setTodolistsAC([]))
    handleServerNetworkError(e, dispatch)
  }
  dispatch(setAppStatusAC('idle'))
}

export const addTodolistTC =
  (title: string): AppThunkType<Promise<void>> =>
  async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
      const todoRes = await todolistAPI.addTodolist(title)
      dispatch(addTodolistAC(todoRes.data.data.item))
      const taskRes = await todolistAPI.getTasks(todoRes.data.data.item.id)
      dispatch(setTasksAC(todoRes.data.data.item.id, taskRes.data.items))
    } catch (e: unknown) {
      if (axios.isAxiosError<ErrorResponseType>(e)) {
        // handleServerNetworkError(e as AxiosError<ErrorResponseType>, dispatch)
        handleServerNetworkError(e, dispatch)
      } else {
        dispatch(setAppErrorAC((e as Error).message))
      }
    }
    dispatch(setAppStatusAC('idle'))
  }

export const deleteTodolistTC =
  (todolistId: string): AppThunkType =>
  (dispatch) => {
    dispatch(changeEntityStatusAC(todolistId, 'loading'))
    dispatch(setAppStatusAC('loading'))
    todolistAPI
      .deleteTodolist(todolistId)
      .then(() => {
        dispatch(deleteTodolistAC(todolistId))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch((e) => {
        handleServerNetworkError(e, dispatch)
        dispatch(changeEntityStatusAC(todolistId, 'idle'))
      })
      .finally(() => {
        dispatch(setAppStatusAC('idle'))
      })
  }

// type UpdateDomainTodolistModelType = {
//     order: number
//     title: string
// }
export const changeTodolistTitleTC =
  (todolistId: string, title: string): AppThunkType =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeEntityStatusAC(todolistId, 'loading'))
    todolistAPI
      .updateTodolist(todolistId, title)
      .then(() => {
        dispatch(changeTodolistTitleAC(todolistId, title))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch((e) => {
        handleServerNetworkError(e, dispatch)
        dispatch(changeEntityStatusAC(todolistId, 'idle'))
      })
      .finally(() => dispatch(setAppStatusAC('idle')))
  }
