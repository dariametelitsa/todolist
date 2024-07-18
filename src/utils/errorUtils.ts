import { ResponseType } from '../api/todolist-api'
import { setAppError, setAppStatus } from '../app/reducers/appSlice'
import { Dispatch } from 'redux'

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
  // if (data.messages.length) {
  //   dispatch(setAppErrorAC(data.messages[0]))
  // } else {
  //   dispatch(setAppErrorAC('Some error occurred'))
  // }
  dispatch(setAppError({ error: data.messages[0] || 'Some error occurred' }))
  dispatch(setAppStatus({ status: 'failed' }))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppError({ error: error.message ? error.message : 'Some network error occurred' }))
  dispatch(setAppStatus({ status: 'failed' }))
}
