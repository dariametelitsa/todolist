import { FilterValuesType, TodoListDomainType } from 'common/data/dataPropsTypes';
import { todolistAPI } from '../todolistAPI/todolistAPI';
import { AppStatusTypes, setAppStatus } from 'app/reducers/appSlice';
import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';
import { UpdateTodolistTitle } from '../todolistAPI/todolistAPI.types';
import { handleServerAppError, handleServerNetworkError } from 'common/utils';
import { cleatTasksAndTodolists } from 'common/actions/commonActions';
import { fetchTasks } from 'features/todolistList/model/tasksSlice';
import { thunkTryCatch } from 'common/utils/thunkTryCatch';
import { StatusCode } from 'common/enums';

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const slice = createAppSlice({
  name: 'todolists',
  initialState: [] as TodoListDomainType[],
  reducers: (create) => ({
    changedTodolistFilter: create.reducer((state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((td) => td.id === action.payload.id);
      if (index !== -1) state[index].filter = action.payload.filter;
    }),
    changedTodolistCover: create.reducer((state, action: PayloadAction<{ id: string; coverImage: string }>) => {
      const index = state.findIndex((td) => td.id === action.payload.id);
      if (index !== -1) state[index].coverImage = action.payload.coverImage;
    }),
    changeEntityStatus: create.reducer((state, action: PayloadAction<{ id: string; status: AppStatusTypes }>) => {
      const todolist = state.find((td) => td.id === action.payload.id);
      if (todolist) todolist.entityStatus = action.payload.status;
    }),
    addTodolist: create.asyncThunk(
      async (arg: string, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        return thunkTryCatch(thunkAPI, async () => {
          const res = await todolistAPI.addTodolist(arg);
          if (res.data.resultCode === StatusCode.SUCCESS) {
            return { todolist: res.data.data.item };
          } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        });
      },
      {
        fulfilled: (state, action) => {
          state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' });
        },
      }
    ),
    deleteTodolist: create.asyncThunk(
      async (arg: string, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        return thunkTryCatch(thunkAPI, async () => {
          dispatch(changeEntityStatus({ id: arg, status: 'loading' }));
          const res = await todolistAPI.deleteTodolist(arg);
          if (res.data.resultCode === StatusCode.SUCCESS) {
            dispatch(setAppStatus({ status: 'succeeded' }));
            return arg;
          } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        });
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((td) => td.id === action.payload);
          if (index !== -1) {
            state.splice(index, 1);
          }
        },
      }
    ),
    changeTodolistTitle: create.asyncThunk(
      async (arg: UpdateTodolistTitle, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
          dispatch(setAppStatus({ status: 'loading' }));
          dispatch(changeEntityStatus({ id: arg.todolistId, status: 'loading' }));
          await todolistAPI.updateTodolist(arg);
          return arg;
        } catch (error) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        } finally {
          dispatch(changeEntityStatus({ id: arg.todolistId, status: 'idle' }));
          dispatch(setAppStatus({ status: 'idle' }));
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((td) => td.id === action.payload.todolistId);
          if (index !== -1) state[index].title = action.payload.title;
        },
      }
    ),
    getTodolists: create.asyncThunk(
      async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
          const res = await todolistAPI.getTodolist();
          //dispatch(setTodolists({ todolists: res.data }));
          dispatch(setAppStatus({ status: 'succeeded' }));
          res.data.forEach((tl) => {
            dispatch(fetchTasks(tl.id));
          });
          return { todolists: res.data };
        } catch (error) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        } finally {
          dispatch(setAppStatus({ status: 'idle' }));
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload.todolists.forEach((tl) => {
            state.push({ ...tl, filter: 'all', entityStatus: 'idle' });
          });
        },
      }
    ),
  }),
  extraReducers(builder) {
    builder.addCase(cleatTasksAndTodolists.type, () => {
      return [];
    });
  },
  selectors: {
    selectTodolists: (state) => state,
  },
});

export const {
  changedTodolistFilter,
  changedTodolistCover,
  getTodolists,
  changeEntityStatus,
  addTodolist,
  deleteTodolist,
  changeTodolistTitle,
} = slice.actions;

export const todolistsReducer = slice.reducer;
export const { selectTodolists } = slice.selectors;
