import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { setAppStatus, setIsInitialized } from 'app/reducers/appSlice';
import { handleServerAppError, handleServerNetworkError } from 'common/utils';
import { authAPI } from '../api/authAPI';
import { LoginParams } from '../api/authAPI.types';
import { StatusCode } from 'common/enums';
import { cleatTasksAndTodolists } from 'common/actions/commonActions';

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const slice = createAppSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: (create) => ({
    login: create.asyncThunk(
      async (arg: LoginParams, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        dispatch(setAppStatus({ status: 'loading' }));
        try {
          const res = await authAPI.login(arg);
          if (res.data.resultCode === StatusCode.SUCCESS) {
            dispatch(setAppStatus({ status: 'succeeded' }));
            return true;
          } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
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
    me: create.asyncThunk(
      async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        dispatch(setAppStatus({ status: 'loading' }));
        try {
          const res = await authAPI.me();
          if (res.data.resultCode === StatusCode.SUCCESS) {
            dispatch(setAppStatus({ status: 'succeeded' }));
            return true;
          } else {
            return rejectWithValue(null);
          }
        } catch (error) {
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
    logOut: create.asyncThunk(
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
            return rejectWithValue(null);
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

export const { login, me, logOut } = slice.actions;
export const authReducer = slice.reducer;
export const { selectIsLoggedIn } = slice.selectors;
