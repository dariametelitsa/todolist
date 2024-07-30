import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../../common/utils/createAppAsyncThunk';
import { setAppStatus, setIsInitialized } from '../../../app/reducers/appSlice';
import { handleServerAppError } from '../../../common/utils/handleServerAppError';
import { handleServerNetworkError } from '../../../common/utils/handleServerNetworkError';
import { clearTodolistsData } from '../../todolistList/model/todolistsSlice';
import { authAPI } from '../api/authAPI';
import { LoginParams } from '../api/authAPI.types';
import { STATUS_CODE } from '../../../common/enums/enums';

const slice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: {
    // setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
    //   state.isLoggedIn = action.payload.isLoggedIn;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
      });
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
});

export const authReducer = slice.reducer;
export const { selectIsLoggedIn } = slice.selectors;

export const login = createAppAsyncThunk<boolean, LoginParams>(`${slice.name}/login`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(setAppStatus({ status: 'loading' }));
  try {
    const res = await authAPI.login(arg);
    if (res.data.resultCode === STATUS_CODE.SUCCESS) {
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
});

export const me = createAppAsyncThunk<boolean>(`${slice.name}/me`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(setAppStatus({ status: 'loading' }));
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === STATUS_CODE.SUCCESS) {
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
});

export const logOut = createAppAsyncThunk<boolean>(`${slice.name}/logOut`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(setAppStatus({ status: 'loading' }));
  try {
    const res = await authAPI.logOut();
    if (res.data.resultCode === STATUS_CODE.SUCCESS) {
      dispatch(clearTodolistsData());
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
});
