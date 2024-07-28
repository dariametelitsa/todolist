import { FilterValuesType, TodoListDomainType } from '../../../data/dataPropsTypes';
import { TodolistType } from '../../../api/todolist-api';
import { AppStatusTypes } from '../../../app/reducers/appSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'todolists',
  initialState: [] as TodoListDomainType[],
  reducers: {
    deleteTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((td) => td.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' });
    },
    changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const index = state.findIndex((td) => td.id === action.payload.id);
      if (index !== -1) state[index].title = action.payload.title;
    },
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
  selectors: {
    selectTodolists: (state) => state,
  },
});

export const {
  deleteTodolist,
  addTodolist,
  changeTodolistTitle,
  changedTodolistFilter,
  changedTodolistCover,
  setTodolists,
  changeEntityStatus,
  clearTodolistsData,
} = slice.actions;

export const todolistsReducer = slice.reducer;
export const { selectTodolists } = slice.selectors;
