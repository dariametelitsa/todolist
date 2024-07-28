import { TasksType } from '../../../data/dataPropsTypes';
import { TaskType, todolistAPI } from '../../../api/todolist-api';
import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addTodolist, clearTodolistsData, deleteTodolist, setTodolists } from './todolistsSlice';
import { setAppStatus } from '../../../app/reducers/appSlice';

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksType,
  reducers: {
    deleteTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((task) => task.id === action.payload.taskId);
      if (index !== -1) tasks.splice(index, 1);
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasks = state[action.payload.task.todoListId];
      tasks.unshift(action.payload.task);
    },
    cleanTasksList: (state, action: PayloadAction<{ todolistId: string }>) => {
      state[action.payload.todolistId] = [];
    },
    updateTask: (state, action: PayloadAction<{ todolistId: string; taskId: string; task: TaskType }>) => {
      const tasks = state[action.payload.task.todoListId];
      const index = tasks.findIndex((task) => task.id === action.payload.taskId);
      if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.task };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(deleteTodolist, (state, action) => {
        delete state[action.payload.id];
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
      });
  },
  selectors: {
    selectTasks: (state) => state,
  },
});

export const { deleteTask, addTask, cleanTasksList, updateTask } = slice.actions;
export const tasksReducer = slice.reducer;
export const { selectTasks } = slice.selectors;

export const selectTasksForTodolist = createSelector(
  [selectTasks, (state, todolistId) => todolistId],
  (tasksList, todolistId) => tasksList[todolistId] || []
);

export const fetchTasks = createAsyncThunk(`${slice.name}/fetchTasks`, async (todolistId: string, thunkAPI) => {
  const { dispatch } = thunkAPI;
  dispatch(setAppStatus({ status: 'loading' }));
  try {
    const res = await todolistAPI.getTasks(todolistId);
    return { todolistId: todolistId, tasks: res.data.items };
  } catch {
    return { todolistId: todolistId, tasks: [] };
  } finally {
    dispatch(setAppStatus({ status: 'idle' }));
  }
});
