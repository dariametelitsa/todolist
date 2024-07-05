import { ResponseType } from '../api/todolist-api'
import { setAppErrorAC, setAppStatusAC } from '../app/reducers/appReducer'
import { Dispatch } from 'redux'
import { changeEntityStatusAC } from '../features/todolistList/redusers/todolistsReducer'

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
  // if (data.messages.length) {
  //   dispatch(setAppErrorAC(data.messages[0]))
  // } else {
  //   dispatch(setAppErrorAC('Some error occurred'))
  // }
  dispatch(setAppErrorAC(data.messages[0] || 'Some error occurred'))
  dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
  dispatch(setAppStatusAC('failed'))
}
