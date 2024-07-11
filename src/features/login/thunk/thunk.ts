// thunks
import { setAppStatusAC, setIsInitializedAC } from '../../../app/reducers/appReducer'
import { LoginType } from '../Login'
import { Dispatch } from 'redux'
import { RootActionsType } from '../../../app/store'
import { authAPI } from '../../../api/todolist-api'
import { setIsLoggedInAC } from '../reduser/auth-reduser'
import { handleServerAppError, handleServerNetworkError } from '../../../utils/errorUtils'

export const loginTC = (data: LoginType) => (dispatch: Dispatch<RootActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  authAPI
    .login(data)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch)
    })
}

export const meTC = () => (dispatch: Dispatch<RootActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch)
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true))
    })
}

export const logOutTC = () => (dispatch: Dispatch<RootActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  authAPI
    .logOut()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch)
    })
}
