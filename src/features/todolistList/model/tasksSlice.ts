import { FilterValues, Tasks } from 'common/data/dataPropsTypes';
import { asyncThunkCreator, buildCreateSlice, createSelector, isRejected } from '@reduxjs/toolkit';
import { addTodolist, changeEntityStatus, deleteTodolist } from './todolistsSlice';
import { StatusCode, TaskStatuses } from 'common/enums';
import { taskAPI } from 'features/todolistList/api/taskAPI';
import { AddTaskArgs, DeleteTaskArgs, Task, UpdateTaskModelType } from 'features/todolistList/api/taskAPI.types';
import { AppRootStateType } from 'app/store';
import { cleatTasksAndTodolists } from 'common/actions/commonActions';
import { RejectActionError } from 'common/types/types';

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const slice = createAppSlice({
  name: 'tasks',
  initialState: {} as Tasks,
  reducers: (create) => {
    const createAThunk = create.asyncThunk.withTypes<{
      rejectValue: RejectActionError;
    }>();
    return {
      // fetchTasks: createAThunk<{ todolistId: string; tasks: Task[] }, string>(
      //   async (todolistId: string, thunkAPI) => {
      //     const { rejectWithValue } = thunkAPI;
      //     try {
      //       const res = await taskAPI.getTasks(todolistId);
      //       return { todolistId: todolistId, tasks: res.data.items };
      //     } catch (error) {
      //       return rejectWithValue({ error, type: 'catchError' } as RejectActionError);
      //     }
      //   },
      //   {
      //     fulfilled: (state, action) => {
      //       state[action.payload.todolistId] = action.payload.tasks;
      //     },
      //   }
      // ),

      addTask: createAThunk<{ task: Task }, AddTaskArgs>(
        async (arg, thunkApi) => {
          const { rejectWithValue } = thunkApi;
          try {
            const res = await taskAPI.addTask(arg);
            if (res.data.resultCode === StatusCode.SUCCESS) {
              return { task: res.data.data.item };
            } else {
              return rejectWithValue({ error: res.data, type: 'appError' } as RejectActionError);
            }
          } catch (error) {
            return rejectWithValue({ error, type: 'catchError' } as RejectActionError);
          }
        },
        {
          fulfilled: (state, action) => {
            const tasks = state[action.payload.task.todoListId];
            tasks.unshift(action.payload.task);
          },
        }
      ),

      updateTask: createAThunk<
        { task: Task },
        { todolistId: string; taskId: string; model: Partial<UpdateTaskModelType> }
      >(
        async (arg, thunkAPI) => {
          const { dispatch, rejectWithValue, getState } = thunkAPI;
          const state = getState() as AppRootStateType;
          const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId);
          if (task) {
            try {
              dispatch(changeEntityStatus({ id: arg.todolistId, status: 'loading' }));
              const apiModel: UpdateTaskModelType = { ...task, ...arg.model };
              const res = await taskAPI.updateTask(arg.todolistId, arg.taskId, apiModel);
              if (res.data.resultCode === StatusCode.SUCCESS) {
                return { task: res.data.data.item };
              } else {
                return rejectWithValue({ error: res.data, type: 'appError' } as RejectActionError);
              }
            } catch (error) {
              return rejectWithValue({ error, type: 'catchError' } as RejectActionError);
            } finally {
              dispatch(changeEntityStatus({ id: arg.todolistId, status: 'idle' }));
            }
          } else return rejectWithValue({ error: 'There is no such task', type: 'catchError' } as RejectActionError);
          // return thunkTryCatch(thunkAPI, async () => {
          //   if (task) {
          //     const apiModel: UpdateTaskModelType = { ...task, ...arg.model };
          //     dispatch(changeEntityStatus({ id: arg.todolistId, status: 'loading' }));
          //     const res = await taskAPI.updateTask(arg.todolistId, arg.taskId, apiModel);
          //     return { task: res.data.data.item };
          //   } else {
          //     //return rejectWithValue(null);
          //   }
          // }).finally(() => {
          //   dispatch(changeEntityStatus({ id: arg.todolistId, status: 'idle' }));
          // });
        },
        {
          fulfilled: (state, action) => {
            const tasks = state[action.payload.task.todoListId];
            const index = tasks.findIndex((task) => task.id === action.payload.task.id);
            if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.task };
          },
        }
      ),

      deleteTask: createAThunk<DeleteTaskArgs, DeleteTaskArgs>(
        async (arg, thunkAPI) => {
          const { dispatch, rejectWithValue } = thunkAPI;
          try {
            dispatch(changeEntityStatus({ id: arg.todolistId, status: 'loading' }));
            const res = await taskAPI.deleteTask(arg);
            if (res.data.resultCode === StatusCode.SUCCESS) {
              return { ...arg };
            } else {
              return rejectWithValue({ error: res.data, type: 'appError' } as RejectActionError);
            }
          } catch (error) {
            return rejectWithValue({ error, type: 'catchError' } as RejectActionError);
          } finally {
            dispatch(changeEntityStatus({ id: arg.todolistId, status: 'idle' }));
          }
        },
        {
          fulfilled: (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex((task) => task.id === action.payload.taskId);
            if (index !== -1) {
              tasks.splice(index, 1);
            }
          },
        }
      ),

      cleanTasksList: createAThunk<string, string>(
        async (todolistId, thunkAPI) => {
          const { dispatch, getState, rejectWithValue } = thunkAPI;
          const state = getState() as AppRootStateType;
          const tasks = state.tasks[todolistId];
          const requests = tasks.map((t) => taskAPI.deleteTask({ todolistId, taskId: t.id }));
          try {
            dispatch(changeEntityStatus({ id: todolistId, status: 'loading' }));
            await Promise.all(requests);
            return todolistId;
          } catch (error) {
            return rejectWithValue({ error, type: 'catchError' } as RejectActionError);
          } finally {
            dispatch(changeEntityStatus({ id: todolistId, status: 'idle' }));
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload] = [];
          },
        }
      ),
    };
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload];
      })
      // .addCase(fetchTodolists.fulfilled, (state, action) => {
      //   action.payload.todolists.forEach((tl) => {
      //     state[tl.id] = [];
      //   });
      // })
      .addCase(cleanTasksList.fulfilled, (state, action) => {
        state[action.payload] = [];
      })
      .addCase(cleatTasksAndTodolists.type, () => {
        return {};
      })
      .addMatcher(isRejected(cleanTasksList), (_, action) => {
        alert(action.error.message);
      });
  },
  selectors: {
    selectTasks: (state) => state,
    selectTasksByTd: (state, todolistId: string) => state[todolistId],
    selectFilteredTasks: (state, todolistId: string, filter: FilterValues): Task[] => {
      let filteredTasks = state[todolistId];
      if (filter === 'active') {
        return filteredTasks.filter((t) => t.status !== TaskStatuses.Completed);
      }
      if (filter === 'completed') {
        return filteredTasks.filter((t) => t.status === TaskStatuses.Completed);
      }
      return filteredTasks;
    },
  },
});

export const { addTask, updateTask, deleteTask, cleanTasksList } = slice.actions;
export const tasksReducer = slice.reducer;
export const { selectTasks, selectTasksByTd, selectFilteredTasks } = slice.selectors;

export const selectTasksForTodolist = createSelector(
  [selectTasks, (_, todolistId) => todolistId],
  (tasksList, todolistId) => tasksList[todolistId] || []
);

export const makeSelectFilteredTasks = createSelector(
  [selectTasks, (_, todolistId: string) => todolistId, (_, todolistId: string, filter: FilterValues) => filter],
  (tasks, todolistId, filter) => {
    let allTasks: Task[] = tasks[todolistId];
    switch (filter) {
      case 'completed':
        return allTasks.filter((t) => t.status === TaskStatuses.Completed);
      case 'active':
        return allTasks.filter((t) => t.status !== TaskStatuses.Completed);
      case 'all':
      default:
        return allTasks;
    }
  }
);

// export const makeSelectFilteredTasks = createSelector(
//   [
//     selectTasks,
//     (state, todolistId: string) => todolistId,
//     (state, todolistId: string, filter: FilterValuesType) => filter,
//   ],
//   (tasks, todolistId, filter) => {
//     const allTasks = tasks[todolistId] || [];
//     switch (filter) {
//       case 'completed':
//         return allTasks.filter((t) => t.status === TaskStatuses.Completed);
//       case 'active':
//         return allTasks.filter((t) => t.status !== TaskStatuses.Completed);
//       case 'all':
//       default:
//         return allTasks;
//     }
//   }
// );

// export const makeSelectFilteredTasks = (todolistId: string, filter: FilterValuesType) =>
//   createSelector([selectTasks], (tasks) => {
//     const allTasks = tasks[todolistId] || [];
//     switch (filter) {
//       case 'completed':
//         return allTasks.filter((t) => t.status === TaskStatuses.Completed);
//       case 'active':
//         return allTasks.filter((t) => t.status !== TaskStatuses.Completed);
//       case 'all':
//       default:
//         return allTasks;
//     }
//   });
