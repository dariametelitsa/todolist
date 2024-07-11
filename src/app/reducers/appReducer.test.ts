import { appReducer, setAppStatusAC, setAppErrorAC, AppStatusTypes, InitialAppStateType } from './appReducer'

let startState: InitialAppStateType

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    isInitialized: true,
  }
})

test('correct error message should be set', () => {
  const errorMessage = 'Some error message'
  const endState = appReducer(startState, setAppErrorAC(errorMessage))

  expect(endState.error).toBe(errorMessage)
})

test('status should set properly', () => {
  const status: AppStatusTypes = 'loading'
  const endState = appReducer(startState, setAppStatusAC(status))

  expect(endState.status).toBe(status)
})
