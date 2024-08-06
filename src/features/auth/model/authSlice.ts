import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { setAppStatus, setIsInitialized } from 'app/reducers/appSlice';
import { handleServerAppError, handleServerNetworkError } from 'common/utils';
import { authAPI } from '../api/authAPI';
import { LoginParams } from '../api/authAPI.types';
import { StatusCode } from 'common/enums';
import { cleatTasksAndTodolists } from 'common/actions/commonActions';
import { BaseResponse } from 'common/types';
import { thunkTryCatch } from 'common/utils/thunkTryCatch';

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const slice = createAppSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: (create) => ({
    login: create.asyncThunk<boolean, LoginParams, { rejectValue: BaseResponse | null }>(
      async (arg: LoginParams, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        dispatch(setAppStatus({ status: 'loading' }));
        try {
          const res = await authAPI.login(arg);
          if (res.data.resultCode === StatusCode.SUCCESS) {
            dispatch(setAppStatus({ status: 'succeeded' }));
            return true;
          } else {
            const isShowGlobalError = !res.data.messages.length;
            handleServerAppError(res.data, dispatch, isShowGlobalError);
            return rejectWithValue(res.data);
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        } finally {
          dispatch(setAppStatus({ status: 'idle' }));
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload;
        },
      }
    ),
    initializeApp: create.asyncThunk<boolean, undefined, { rejectValue: BaseResponse | null }>(
      async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        return thunkTryCatch(thunkAPI, async () => {
          const res = await authAPI.me();
          if (res.data.resultCode === StatusCode.SUCCESS) {
            dispatch(setAppStatus({ status: 'succeeded' }));
            return true;
          } else {
            return rejectWithValue(null);
          }
        }).finally(() => {
          dispatch(setIsInitialized({ isInitialized: true }));
        });
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload;
        },
      }
    ),

    logOut: create.asyncThunk<boolean, undefined, { rejectValue: BaseResponse | null }>(
      async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        dispatch(setAppStatus({ status: 'loading' }));
        try {
          const res = await authAPI.logOut();
          if (res.data.resultCode === StatusCode.SUCCESS) {
            //dispatch(clearTodolistsData());
            dispatch(cleatTasksAndTodolists());
            dispatch(setAppStatus({ status: 'succeeded' }));
            return false;
          } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(res.data);
            //return rejectWithValue({ error: res.data.messages[0] });
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        } finally {
          dispatch(setIsInitialized({ isInitialized: true }));
          dispatch(setAppStatus({ status: 'idle' }));
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload;
        },
      }
    ),
  }),
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
