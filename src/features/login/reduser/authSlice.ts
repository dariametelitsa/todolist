import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const { setIsLoggedIn } = slice.actions
export const authReducer = slice.reducer

// const initialState = {
//   isLoggedIn: false,
// }
// type InitialStateType = typeof initialState

// export const _authReducer = (state: InitialStateType = initialState, action: PayloadAction): InitialStateType => {
//   switch (action.type) {
//     case 'AUTH/SET-IS-LOGGED-IN':
//       return { ...state, isLoggedIn: action.value }
//     default:
//       return state
//   }
// }
// actions
// export const setIsLoggedInAC = (value: boolean) => ({ type: 'AUTH/SET-IS-LOGGED-IN', value }) as const

// types
// export type ActionsAuthType = ReturnType<typeof setIsLoggedInAC> | ActionsGlobalType
//| SetAppErrorActionType
