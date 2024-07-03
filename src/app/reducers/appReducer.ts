export type RequestStatusTypes = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialAppStateType = {
  status: RequestStatusTypes
  error: string | null
}

const initialState: InitialAppStateType = {
  status: 'idle',
  error: null,
}

export const appReduser = (
  state: InitialAppStateType = initialState,
  action: ActionsGlobalType
): InitialAppStateType => {
  switch (action.type) {
    case 'APP/SET_STATUS': {
      return { ...state, status: action.payload.status }
    }
    case 'APP/SET_ERROR': {
      return { ...state, error: action.payload.error }
    }
    default: {
      return state
    }
  }
}

export const setAppStatusAC = (status: RequestStatusTypes) => ({ type: 'APP/SET_STATUS', payload: { status } }) as const
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET_ERROR', payload: { error } }) as const

export type ActionsGlobalType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>
