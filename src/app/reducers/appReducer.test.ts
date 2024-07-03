import { appReduser, setAppStatusAC, setAppErrorAC, InitialAppStateType, RequestStatusTypes } from './appReducer'

let startState: InitialAppStateType

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
  }
})

test('correct error message should be set', () => {
  const errorMessage = 'Some error message'
  const endState = appReduser(startState, setAppErrorAC(errorMessage))

  expect(endState.error).toBe(errorMessage)
})

test('status should set properly', () => {
  const status: RequestStatusTypes = 'loading'
  const endState = appReduser(startState, setAppStatusAC(status))

  expect(endState.status).toBe(status)
})
