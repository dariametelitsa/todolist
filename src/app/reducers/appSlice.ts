import { createSlice, isAllOf, isFulfilled, isPending, PayloadAction } from '@reduxjs/toolkit';
import { fetchTasks } from 'features/todolistList/model/tasksSlice';

export type AppStatusTypes = 'idle' | 'loading' | 'succeeded' | 'failed';

// export type InitialAppStateType = {
//   status: AppStatusTypes
//   error: string | null
//   isInitialized: boolean
// }
//
// const initialState: InitialAppStateType = {
//   status: 'idle',
//   error: null,
//   isInitialized: false,
// }

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as AppStatusTypes,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: AppStatusTypes }>) => {
      state.status = action.payload.status;
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(fetchTasks), (state, action) => {
        state.status = 'loading';
      })
      .addMatcher(isAllOf(fetchTasks.fulfilled), (state, action) => {
        state.status = 'idle';
      });
  },

  selectors: {
    selectAppStatus: (state) => state.status,
    selectAppError: (state) => state.error,
    selectAppIsInitialized: (state) => state.isInitialized,
  },
});

export type AppInitialState = ReturnType<typeof slice.getInitialState>;

export const { setAppStatus, setAppError, setIsInitialized } = slice.actions;
export const appReducer = slice.reducer;
export const { selectAppStatus, selectAppError, selectAppIsInitialized } = slice.selectors;
