import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RejectActionError } from 'common/types/types';
// import { initializeApp } from 'features/auth/model/authSlice';

export type AppStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as AppStatus,
    error: null as string | null,
    isInitialized: false,
    isLoggedIn: false,
  },
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: AppStatus }>) => {
      state.status = action.payload.status;
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },

  extraReducers: (builder) => {
    // @ts-ignore
    builder
      .addMatcher(isPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = 'idle';
      })
      .addMatcher(isRejected, (state) => {
        state.status = 'failed';
      })
      .addMatcher(
        (action): action is PayloadAction<RejectActionError> => {
          return isRejected(action) && action.payload;
        },
        //(action) => action.type.endsWith('/rejected'),
        (state, action: PayloadAction<RejectActionError>) => {
          // if (action.type === initializeApp.rejected.type) {
          //   return;
          // }

          const defaultErrorMessage = 'Some error occurred';
          switch (action.payload.type) {
            case 'appError': {
              state.error = action.payload.error.messages.length
                ? action.payload.error.messages[0]
                : defaultErrorMessage;
              break;
            }
            case 'catchError': {
              let error = action.payload.error;
              if (axios.isAxiosError(error)) {
                state.error = error.response?.data?.message || error?.message || defaultErrorMessage;
              } else if (error instanceof Error) {
                state.error = `Native error: ${error.message}`;
              } else {
                state.error = JSON.stringify(error);
              }
              break;
            }
            default: {
              state.error = defaultErrorMessage;
            }
          }
        }
      );
  },

  selectors: {
    selectAppStatus: (state) => state.status,
    selectAppIsLogin: (state) => state.isLoggedIn,
    selectAppError: (state) => state.error,
    selectAppIsInitialized: (state) => state.isInitialized,
  },
});

export type AppInitialState = ReturnType<typeof slice.getInitialState>;

export const { setAppStatus, setAppError, setIsInitialized, setIsLoggedIn } = slice.actions;
export const appReducer = slice.reducer;
export const { selectAppStatus, selectAppError, selectAppIsInitialized, selectAppIsLogin } = slice.selectors;
