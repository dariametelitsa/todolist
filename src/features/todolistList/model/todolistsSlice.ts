import { FilterValuesType, TodoListDomainType } from '../../../common/data/dataPropsTypes';
import { todolistAPI } from '../todolistAPI/todolistAPI';
import { AppStatusTypes, setAppStatus } from '../../../app/reducers/appSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../../common/utils/createAppAsyncThunk';
import { handleServerNetworkError } from '../../../common/utils/handleServerNetworkError';
import { TodolistType, UpdateTodolistTitle } from '../todolistAPI/todolistAPI.types';

const slice = createSlice({
  name: 'todolists',
  initialState: [] as TodoListDomainType[],
  reducers: {
    changedTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((td) => td.id === action.payload.id);
      if (index !== -1) state[index].filter = action.payload.filter;
    },
    changedTodolistCover: (state, action: PayloadAction<{ id: string; coverImage: string }>) => {
      const index = state.findIndex((td) => td.id === action.payload.id);
      if (index !== -1) state[index].coverImage = action.payload.coverImage;
    },
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      action.payload.todolists.forEach((tl) => {
        state.push({ ...tl, filter: 'all', entityStatus: 'idle' });
      });
    },
    changeEntityStatus: (state, action: PayloadAction<{ id: string; status: AppStatusTypes }>) => {
      const todolist = state.find((td) => td.id === action.payload.id);
      if (todolist) todolist.entityStatus = action.payload.status;
    },
    clearTodolistsData: () => {
      return [];
    },
  },
  extraReducers(builder) {
    builder
      // .addCase(getTodolists.fulfilled, (state, action) => {
      //   action.payload.forEach((tl) => {
      //     state.push({ ...tl, filter: 'all', entityStatus: 'idle' });
      //   });
      // })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' });
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((td) => td.id === action.payload);
        if (index !== -1) {
          state.splice(index, 1);
        }
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex((td) => td.id === action.payload.todolistId);
        if (index !== -1) state[index].title = action.payload.title;
      });
  },
  selectors: {
    selectTodolists: (state) => state,
  },
});

export const { changedTodolistFilter, changedTodolistCover, setTodolists, changeEntityStatus, clearTodolistsData } =
  slice.actions;

export const todolistsReducer = slice.reducer;
export const { selectTodolists } = slice.selectors;

// //todo no parameters
// export const getTodolists = createAppAsyncThunk<TodolistType[]>(`${slice.name}`, async (arg, thunkAPI) => {
//   const { dispatch, rejectWithValue } = thunkAPI;
//   try {
//     const res = await todolistAPI.getTodolist();
//     dispatch(setTodolists({ todolists: res.data }));
//     dispatch(setAppStatus({ status: 'succeeded' }));
//     res.data.forEach((tl) => {
//       dispatch(fetchTasks(tl.id));
//     });
//     return res.data;
//   } catch (error) {
//     handleServerNetworkError(error, dispatch);
//     return rejectWithValue(null);
//   } finally {
//     dispatch(setAppStatus({ status: 'idle' }));
//   }
// });

export const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
  `${slice.name}/addTodolist`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(setAppStatus({ status: 'loading' }));
      const todoRes = await todolistAPI.addTodolist(arg);
      return { todolist: todoRes.data.data.item };
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(setAppStatus({ status: 'idle' }));
    }
  }
);

export const deleteTodolist = createAppAsyncThunk<string, string>(
  `${slice.name}/deleteTodolist`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(changeEntityStatus({ id: arg, status: 'loading' }));
      dispatch(setAppStatus({ status: 'loading' }));
      await todolistAPI.deleteTodolist(arg);
      dispatch(setAppStatus({ status: 'succeeded' }));
      return arg;
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(setAppStatus({ status: 'idle' }));
    }
  }
);

export const changeTodolistTitle = createAppAsyncThunk<UpdateTodolistTitle, UpdateTodolistTitle>(
  `${slice.name}`,
  async (arg, thunkAPI) => {
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
  }
);
