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
import { setAppError, setAppStatus } from '../../../app/reducers/appSlice'
import { handleServerAppError, handleServerNetworkError } from '../../../utils/errorUtils'
import axios from 'axios'
import { STATUS_CODE } from './tasksThunks'

export const getTodolistsTC = (): AppThunkType<Promise<void>> => async (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const todolists = await todolistAPI.getTodolist()
    dispatch(setTodolistsAC(todolists.data))
    dispatch(setAppStatus({ status: 'succeeded' }))
    // todolists.data.forEach((tl) => {
    //   dispatch(getTasksTC(tl.id))
    // })
  } catch (e: any) {
    dispatch(setTodolistsAC([]))
    handleServerNetworkError(e, dispatch)
  } finally {
    dispatch(setAppStatus({ status: 'idle' }))
  }
}

export const addTodolistTC =
  (title: string): AppThunkType<Promise<void>> =>
  async (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
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
        dispatch(setAppError({ error: (e as Error).message }))
      }
    }
    dispatch(setAppStatus({ status: 'idle' }))
  }

export const deleteTodolistTC =
  (todolistId: string): AppThunkType =>
  (dispatch) => {
    dispatch(changeEntityStatusAC(todolistId, 'loading'))
    dispatch(setAppStatus({ status: 'loading' }))
    todolistAPI
      .deleteTodolist(todolistId)
      .then((res) => {
        if (res.data.resultCode === STATUS_CODE.SUCCESS) {
          dispatch(deleteTodolistAC(todolistId))
          dispatch(setAppStatus({ status: 'succeeded' }))
        } else {
          handleServerAppError(res.data, dispatch)
          dispatch(changeEntityStatusAC(todolistId, 'failed'))
        }
      })
      .catch((e) => {
        handleServerNetworkError(e, dispatch)
        dispatch(changeEntityStatusAC(todolistId, 'failed'))
      })
      .finally(() => {
        dispatch(setAppStatus({ status: 'idle' }))
      })
  }

export const changeTodolistTitleTC =
  (todolistId: string, title: string): AppThunkType =>
  (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    dispatch(changeEntityStatusAC(todolistId, 'loading'))
    todolistAPI
      .updateTodolist(todolistId, title)
      .then(() => {
        dispatch(changeTodolistTitleAC(todolistId, title))
        dispatch(setAppStatus({ status: 'succeeded' }))
      })
      .catch((e) => {
        handleServerNetworkError(e, dispatch)
        dispatch(changeEntityStatusAC(todolistId, 'failed'))
      })
      .finally(() => {
        dispatch(setAppStatus({ status: 'idle' }))
        dispatch(changeEntityStatusAC(todolistId, 'idle'))
      })
  }
