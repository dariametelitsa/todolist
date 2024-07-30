import { TasksType } from 'common/data/dataPropsTypes';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { addTodolist, changeEntityStatus, clearTodolistsData, deleteTodolist, setTodolists } from './todolistsSlice';
import { setAppStatus } from 'app/reducers/appSlice';
import { handleServerNetworkError } from 'common/utils';
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk';
import { handleServerAppError } from 'common/utils';
import { StatusCode } from 'common/enums';
import { taskAPI } from '../todolistAPI/taskAPI';
import { AddTaskArgs, DeleteTaskArgs, TaskType, UpdateTaskModelType } from '../todolistAPI/todolistAPI.types';

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload];
      })
      .addCase(setTodolists, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(clearTodolistsData, () => {
        return {};
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId];
        tasks.unshift(action.payload.task);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId];
        const index = tasks.findIndex((task) => task.id === action.payload.task.id);
        if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.task };
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((task) => task.id === action.payload.taskId);
        if (index !== -1) tasks.splice(index, 1);
      })
      .addCase(cleanTasksList.fulfilled, (state, action) => {
        state[action.payload] = [];
      });
  },
  selectors: {
    selectTasks: (state) => state,
  },
});

// export const { cleanTasksList } = slice.actions;
export const tasksReducer = slice.reducer;
export const { selectTasks } = slice.selectors;

export const selectTasksForTodolist = createSelector(
  [selectTasks, (state, todolistId) => todolistId],
  (tasksList, todolistId) => tasksList[todolistId] || []
);

export const fetchTasks = createAppAsyncThunk<{ todolistId: string; tasks: TaskType[] }, string>(
  `${slice.name}/fetchTasks`,
  async (todolistId: string, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(setAppStatus({ status: 'loading' }));
    try {
      const res = await taskAPI.getTasks(todolistId);
      return { todolistId: todolistId, tasks: res.data.items };
    } catch (error: any) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(setAppStatus({ status: 'idle' }));
    }
  }
);

export const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgs>(
  `${slice.name}/addTask`,
  async (arg, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    dispatch(setAppStatus({ status: 'loading' }));
    try {
      const res = await taskAPI.addTask(arg);
      if (res.data.resultCode === StatusCode.SUCCESS) {
        return { task: res.data.data.item };
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
  }
);

export const updateTask = createAppAsyncThunk<
  { task: TaskType },
  { todolistId: string; taskId: string; model: Partial<UpdateTaskModelType> }
>(`${slice.name}/updateTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue, getState } = thunkAPI;
  const task = getState().tasks[arg.todolistId].find((t) => t.id === arg.taskId);
  try {
    if (task) {
      const apiModel: UpdateTaskModelType = { ...task, ...arg.model };
      dispatch(changeEntityStatus({ id: arg.todolistId, status: 'loading' }));
      const res = await taskAPI.updateTask(arg.todolistId, arg.taskId, apiModel);
      return { task: res.data.data.item };
    } else {
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(changeEntityStatus({ id: arg.todolistId, status: 'idle' }));
    dispatch(setAppStatus({ status: 'idle' }));
  }
});

export const deleteTask = createAppAsyncThunk<DeleteTaskArgs, DeleteTaskArgs>(
  `${slice.name}/deleteTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(changeEntityStatus({ id: arg.todolistId, status: 'loading' }));
      const res = await taskAPI.deleteTask(arg);
      if (res.data.resultCode === StatusCode.SUCCESS) {
        return { ...arg };
      } else {
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(changeEntityStatus({ id: arg.todolistId, status: 'idle' }));
      dispatch(setAppStatus({ status: 'idle' }));
    }
  }
);

export const cleanTasksList = createAppAsyncThunk<string, string>(
  `${slice.name}/cleanTasksList`,
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;
    try {
      const tasks = getState().tasks[todolistId];
      const requests = tasks.map((t) => taskAPI.deleteTask({ todolistId, taskId: t.id }));
      await Promise.all(requests);
      return todolistId;
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(changeEntityStatus({ id: todolistId, status: 'idle' }));
      dispatch(setAppStatus({ status: 'idle' }));
    }
  }
);
