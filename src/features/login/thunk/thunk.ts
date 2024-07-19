// thunks
import { setAppStatus, setIsInitialized } from '../../../app/reducers/appSlice'
import { LoginType } from '../Login'
import { Dispatch } from 'redux'
import { authAPI } from '../../../api/todolist-api'
import { setIsLoggedIn } from '../reduser/authSlice'
import { handleServerAppError, handleServerNetworkError } from '../../../utils/errorUtils'
import { clearTodolistsData } from '../../todolistList/redusers/todolistsSlice'

export const loginTC = (data: LoginType) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  authAPI
    .login(data)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch)
    })
}

export const meTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        //handleServerAppError(res.data, dispatch)
      }
    })
    .catch((e) => {
      //handleServerNetworkError(e, dispatch)
    })
    .finally(() => {
      dispatch(setIsInitialized({ isInitialized: true }))
      dispatch(setAppStatus({ status: 'idle' }))
    })
}

export const logOutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  authAPI
    .logOut()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        console.log('logOut API => isLoggedIn false')
        dispatch(clearTodolistsData({}))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch)
    })
}
