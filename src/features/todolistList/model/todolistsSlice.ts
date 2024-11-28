import { FilterValues, TodoListDomain } from 'common/data/dataPropsTypes';
import { todolistAPI } from 'features/todolistList/api/todolistAPI';
import { AppStatus } from 'app/model/appSlice';
import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodolistType, UpdateTodolistTitle } from 'features/todolistList/api/todolistAPI.types';
import { cleatTasksAndTodolists } from 'common/actions/commonActions';
import { StatusCode } from 'common/enums';
import { RejectActionError } from 'common/types/types';

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const slice = createAppSlice({
  name: 'todolists',
  initialState: [] as TodoListDomain[],
  reducers: (create) => {
    const createAThunk = create.asyncThunk.withTypes<{
      rejectValue: RejectActionError;
    }>();

    return {
      changedTodolistFilter: create.reducer(
        (
          state,
          action: PayloadAction<{
            id: string;
            filter: FilterValues;
          }>
        ) => {
          const index = state.findIndex((td) => td.id === action.payload.id);
          if (index !== -1) state[index].filter = action.payload.filter;
        }
      ),

      changedTodolistCover: create.reducer((state, action: PayloadAction<{ id: string; coverImage: string }>) => {
        const index = state.findIndex((td) => td.id === action.payload.id);
        if (index !== -1) state[index].coverImage = action.payload.coverImage;
      }),

      changeEntityStatus: create.reducer((state, action: PayloadAction<{ id: string; status: AppStatus }>) => {
        const todolist = state.find((td) => td.id === action.payload.id);
        if (todolist) todolist.entityStatus = action.payload.status;
      }),

      // addTodolist: createAThunk<{ todolist: TodolistType }, string>(
      //   async (arg, thunkAPI) => {
      //     const { rejectWithValue } = thunkAPI;
      //     try {
      //       const res = await todolistAPI.addTodolist(arg);
      //       if (res.data.resultCode === StatusCode.SUCCESS) {
      //         return { todolist: res.data.data.item };
      //       } else {
      //         return rejectWithValue({ error: res.data, type: 'appError' } as RejectActionError);
      //       }
      //     } catch (error) {
      //       return rejectWithValue({ error, type: 'catchError' } as RejectActionError);
      //     }
      //   },
      //   {
      //     fulfilled: (state, action) => {
      //       state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' });
      //     },
      //   }
      // ),

      // deleteTodolist: createAThunk<string, string>(
      //   async (arg, thunkAPI) => {
      //     const { dispatch, rejectWithValue } = thunkAPI;
      //     dispatch(changeEntityStatus({ id: arg, status: 'loading' }));
      //     try {
      //       const res = await todolistAPI.deleteTodolist(arg);
      //       if (res.data.resultCode === StatusCode.SUCCESS) {
      //         return arg;
      //       } else {
      //         return rejectWithValue({ error: res.data, type: 'appError' } as RejectActionError);
      //       }
      //     } catch (error) {
      //       return rejectWithValue({ error, type: 'catchError' } as RejectActionError);
      //     }
      //   },
      //   {
      //     fulfilled: (state, action) => {
      //       const index = state.findIndex((td) => td.id === action.payload);
      //       if (index !== -1) {
      //         state.splice(index, 1);
      //       }
      //     },
      //   }
      // ),

      changeTodolistTitle: createAThunk<UpdateTodolistTitle, UpdateTodolistTitle>(
        async (arg, thunkAPI) => {
          const { rejectWithValue } = thunkAPI;
          try {
            const res = await todolistAPI.updateTodolist(arg);
            if (res.data.resultCode === StatusCode.SUCCESS) {
              return arg;
            } else {
              return rejectWithValue({ error: res.data, type: 'appError' } as RejectActionError);
            }
          } catch (error) {
            return rejectWithValue({ error, type: 'catchError' } as RejectActionError);
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex((td) => td.id === action.payload.todolistId);
            if (index !== -1) state[index].title = action.payload.title;
          },
        }
      ),

      // fetchTodolists: createAThunk<{ todolists: TodolistType[] }>(
      //   async (_, thunkAPI) => {
      //     const { dispatch, rejectWithValue } = thunkAPI;
      //     try {
      //       const res = await todolistAPI.getTodolist();
      //       res.data.forEach((tl) => {
      //         dispatch(fetchTasks(tl.id));
      //       });
      //       return { todolists: res.data };
      //     } catch (error) {
      //       return rejectWithValue({ error, type: 'catchError' } as RejectActionError);
      //     }
      //   },
      //   {
      //     fulfilled: (state, action) => {
      //       action.payload.todolists.forEach((tl) => {
      //         state.push({ ...tl, filter: 'all', entityStatus: 'idle' });
      //       });
      //     },
      //   }
      // ),
    };
  },

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
  // fetchTodolists,
  changeEntityStatus,
  // addTodolist,
  // deleteTodolist,
  changeTodolistTitle,
} = slice.actions;

export const todolistsReducer = slice.reducer;
export const { selectTodolists } = slice.selectors;
