import { FilterValuesType, TodoListDomainType } from '../../../data/dataPropsTypes'
import { TodolistType } from '../../../api/todolist-api'
import { AppStatusTypes } from '../../../app/reducers/appSlice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'todolists',
  initialState: [] as TodoListDomainType[],
  reducers: {
    deleteTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((td) => td.id === action.payload.id)
      if (index !== -1) state.splice(index, 1)
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
    },
    changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const index = state.findIndex((td) => td.id === action.payload.id)
      if (index !== -1) state[index].title = action.payload.title
    },
    changedTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((td) => td.id === action.payload.id)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    changedTodolistCover: (state, action: PayloadAction<{ id: string; coverImage: string }>) => {
      const index = state.findIndex((td) => td.id === action.payload.id)
      if (index !== -1) state[index].coverImage = action.payload.coverImage
    },
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      action.payload.todolists.forEach((tl) => {
        state.push({ ...tl, filter: 'all', entityStatus: 'idle' })
      })
      // return action.payload.todolists.map((tl) => {
      //   return { ...tl, filter: 'all', entityStatus: 'idle' }
      // })
    },
    changeEntityStatus: (state, action: PayloadAction<{ id: string; status: AppStatusTypes }>) => {
      const todolist = state.find((td) => td.id === action.payload.id)
      if (todolist) todolist.entityStatus = action.payload.status
    },
    clearTodolistsData: (state, action: PayloadAction<{}>) => {
      return []
    },
  },
})

export const {
  deleteTodolist,
  addTodolist,
  changeTodolistTitle,
  changedTodolistFilter,
  changedTodolistCover,
  setTodolists,
  changeEntityStatus,
  clearTodolistsData,
} = slice.actions
export const todolistsReducer = slice.reducer

// const initialState: TodoListDomainType[] = []

// export const _todolistsReducer = (
//   state: Array<TodoListDomainType> = initialState,
//   action: TodolistActionsType
// ): Array<TodoListDomainType> => {
//   switch (action.type) {
//     case 'DELETE_TODOLIST': {
//       return state.filter((tl) => tl.id !== action.payload.id)
//     }
//     case 'ADD_TODOLIST': {
//       return [{ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' }, ...state]
//     }
//     case 'CHANGE_TODOLIST_TITLE': {
//       return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
//     }
//     case 'CHANGE_TODOLIST_FILTER': {
//       return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl))
//     }
//     case 'CHANGE_TODOLIST_COVER': {
//       return state.map((tl) => (tl.id === action.payload.id ? { ...tl, coverImage: action.payload.coverImage } : tl))
//     }
//     case 'SET_TODOLISTS': {
//       return action.payload.todolists.map((tl) => {
//         return { ...tl, filter: 'all', entityStatus: 'idle' }
//       })
//     }
//     case 'CHANGE_ENTITY_STATUS': {
//       return state.map((tl) => (tl.id === action.payload.id ? { ...tl, entityStatus: action.payload.status } : tl))
//     }
//     case 'CLEAR_DATA': {
//       return []
//     }
//     default:
//       return state
//   }
// }

// //ac - action creator
// export const deleteTodolistAC = (id: string) => ({ type: 'DELETE_TODOLIST', payload: { id } }) as const
//
// export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD_TODOLIST', payload: { todolist } }) as const

// export const changeTodolistTitleAC = (id: string, title: string) =>
//   ({ type: 'CHANGE_TODOLIST_TITLE', payload: { id, title } }) as const

// export const changedTodolistFilterAC = (id: string, filter: FilterValuesType) =>
//   ({ type: 'CHANGE_TODOLIST_FILTER', payload: { id, filter } }) as const

// export const changedTodolistCoverAC = (id: string, coverImage: string) =>
//   ({ type: 'CHANGE_TODOLIST_COVER' as 'CHANGE_TODOLIST_COVER', payload: { id, coverImage } }) as const

// export const setTodolistsAC = (todolists: TodolistType[]) =>
//   ({ type: 'SET_TODOLISTS', payload: { todolists } }) as const
//
// export const changeEntityStatusAC = (id: string, status: AppStatusTypes) =>
//   ({ type: 'CHANGE_ENTITY_STATUS', payload: { id, status } }) as const
//
// export const clearTodolistsDataAC = () => ({ type: 'CLEAR_DATA' }) as const

// //action types
// export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>
// export type AddTodolistAT = ReturnType<typeof addTodolistAC>
// export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
// export type ClearTodolistsDataAT = ReturnType<typeof clearTodolistsDataAC>
// export type TodolistActionsType =
//   | DeleteTodolistAT
//   | AddTodolistAT
//   | SetTodolistsAT
//   | ReturnType<typeof changeTodolistTitleAC>
//   | ReturnType<typeof changedTodolistFilterAC>
//   | ReturnType<typeof changedTodolistCoverAC>
//   | ReturnType<typeof changeEntityStatusAC>
//   | ClearTodolistsDataAT
