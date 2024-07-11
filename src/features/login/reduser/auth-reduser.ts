import { ActionsGlobalType } from '../../../app/reducers/appReducer'

const initialState = {
  isLoggedIn: false,
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsAuthType): InitialStateType => {
  switch (action.type) {
    case 'AUTH/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    default:
      return state
  }
}
// actions
export const setIsLoggedInAC = (value: boolean) => ({ type: 'AUTH/SET-IS-LOGGED-IN', value }) as const

// types
export type ActionsAuthType = ReturnType<typeof setIsLoggedInAC> | ActionsGlobalType
//| SetAppErrorActionType
