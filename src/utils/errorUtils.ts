import { ResponseType } from '../api/todolist-api'
import { setAppErrorAC, setAppStatusAC } from '../app/reducers/appReducer'
import { Dispatch } from 'redux'

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (rej: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppErrorAC(rej.message ? rej.message : 'Some error occurred'))
  dispatch(setAppStatusAC('failed'))
}
