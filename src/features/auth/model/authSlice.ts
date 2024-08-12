import { asyncThunkCreator, buildCreateSlice, isFulfilled, PayloadAction } from '@reduxjs/toolkit';
import { setAppStatus, setIsInitialized } from 'app/reducers/appSlice';
import { authAPI } from '../api/authAPI';
import { LoginParams } from '../api/authAPI.types';
import { StatusCode } from 'common/enums';
import { cleatTasksAndTodolists } from 'common/actions/commonActions';
import { RejectActionError } from 'common/types/types';

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const slice = createAppSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: (create) => {
    const createAThunk = create.asyncThunk.withTypes<{
      rejectValue: RejectActionError;
    }>();

    return {
      login: createAThunk<boolean, LoginParams>(async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
          const res = await authAPI.login(arg);
          if (res.data.resultCode === StatusCode.SUCCESS) {
            return true;
          } else {
            return rejectWithValue({ error: res.data, type: 'appError' } as RejectActionError);
          }
        } catch (error) {
          return rejectWithValue({ error, type: 'catchError' } as RejectActionError);
        }
      }, {}),

      initializeApp: createAThunk<boolean>(async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
          const res = await authAPI.me();
          if (res.data.resultCode === StatusCode.SUCCESS) {
            dispatch(setAppStatus({ status: 'succeeded' }));
            return true;
          } else {
            return rejectWithValue({ error: res.data, type: 'appError' } as RejectActionError);
          }
        } catch (error) {
          return rejectWithValue({ error, type: 'catchError' } as RejectActionError);
        } finally {
          dispatch(setIsInitialized({ isInitialized: true }));
        }
      }, {}),

      logOut: createAThunk<boolean>(async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;

        try {
          const res = await authAPI.logOut();
          if (res.data.resultCode === StatusCode.SUCCESS) {
            dispatch(cleatTasksAndTodolists());
            dispatch(setAppStatus({ status: 'succeeded' }));
            return false;
          } else {
            return rejectWithValue({ error: res.data, type: 'appError' } as RejectActionError);
          }
        } catch (error) {
          return rejectWithValue({ error, type: 'catchError' } as RejectActionError);
        }
      }, {}),
    };
  },

  extraReducers: (builder) => {
    builder.addMatcher(isFulfilled(login, logOut, initializeApp), (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    });
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
});

export const { login, initializeApp, logOut } = slice.actions;
export const authReducer = slice.reducer;
export const { selectIsLoggedIn } = slice.selectors;

// export const login = createAsyncThunk<boolean, LoginParams, { dispatch: AppDispatch; rejectWithValue: string | null }>(
//   `${slice.name}/login`,
//   async (arg, thunkAPI) => {
//     const { dispatch, rejectWithValue } = thunkAPI;
//     dispatch(setAppStatus({ status: 'loading' }));
//     try {
//       const res = await authAPI.login(arg);
//       if (res.data.resultCode === StatusCode.SUCCESS) {
//         dispatch(setAppStatus({ status: 'succeeded' }));
//         return true;
//       } else {
//         handleServerAppError(res.data, dispatch);
//         return rejectWithValue(res.data.messages[0]);
//       }
//     } catch (error) {
//       handleServerNetworkError(error, dispatch);
//       return rejectWithValue(null);
//     } finally {
//       dispatch(setAppStatus({ status: 'idle' }));
//     }
//   }
// );
