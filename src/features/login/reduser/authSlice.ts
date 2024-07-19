import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const { setIsLoggedIn } = slice.actions
export const authReducer = slice.reducer
export const { selectIsLoggedIn } = slice.selectors
