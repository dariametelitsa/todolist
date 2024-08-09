import { AppInitialState, appReducer, AppStatus, setAppError, setAppStatus } from './appSlice';

let startState: AppInitialState;

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    isInitialized: true,
  };
});

test('correct error message should be set', () => {
  const errorMessage = 'Some error message';
  const endState = appReducer(startState, setAppError({ error: errorMessage }));

  expect(endState.error).toBe(errorMessage);
});

test('status should set properly', () => {
  const status: AppStatus = 'loading';
  const endState = appReducer(startState, setAppStatus({ status }));

  expect(endState.status).toBe(status);
});
