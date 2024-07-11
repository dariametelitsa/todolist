import { FilterValuesType, TodoListDomainType } from '../../../data/dataPropsTypes'
import { TodolistType } from '../../../api/todolist-api'
import { AppStatusTypes } from '../../../app/reducers/appReducer'

const initialState: TodoListDomainType[] = []

export const todolistsReducer = (
  state: Array<TodoListDomainType> = initialState,
  action: TodolistActionsType
): Array<TodoListDomainType> => {
  switch (action.type) {
    case 'DELETE_TODOLIST': {
      return state.filter((tl) => tl.id !== action.payload.id)
    }
    case 'ADD_TODOLIST': {
      return [{ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' }, ...state]
    }
    case 'CHANGE_TODOLIST_TITLE': {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
    }
    case 'CHANGE_TODOLIST_FILTER': {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl))
    }
    case 'CHANGE_TODOLIST_COVER': {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, coverImage: action.payload.coverImage } : tl))
    }
    case 'SET_TODOLISTS': {
      return action.payload.todolists.map((tl) => {
        return { ...tl, filter: 'all', entityStatus: 'idle' }
      })
    }
    case 'CHANGE_ENTITY_STATUS': {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, entityStatus: action.payload.status } : tl))
    }
    case 'CLEAR_DATA': {
      return []
    }
    default:
      return state
  }
}

//ac - action creator
export const deleteTodolistAC = (id: string) => ({ type: 'DELETE_TODOLIST', payload: { id } }) as const

export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD_TODOLIST', payload: { todolist } }) as const

export const changeTodolistTitleAC = (id: string, title: string) =>
  ({ type: 'CHANGE_TODOLIST_TITLE', payload: { id, title } }) as const

export const changedTodolistFilterAC = (id: string, filter: FilterValuesType) =>
  ({ type: 'CHANGE_TODOLIST_FILTER', payload: { id, filter } }) as const

export const changedTodolistCoverAC = (id: string, coverImage: string) =>
  ({ type: 'CHANGE_TODOLIST_COVER' as 'CHANGE_TODOLIST_COVER', payload: { id, coverImage } }) as const

export const setTodolistsAC = (todolists: TodolistType[]) =>
  ({ type: 'SET_TODOLISTS', payload: { todolists } }) as const

export const changeEntityStatusAC = (id: string, status: AppStatusTypes) =>
  ({ type: 'CHANGE_ENTITY_STATUS', payload: { id, status } }) as const

export const clearTodolistsDataAC = () => ({ type: 'CLEAR_DATA' }) as const

//action types
export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
export type ClearTodolistsDataAT = ReturnType<typeof clearTodolistsDataAC>
export type TodolistActionsType =
  | DeleteTodolistAT
  | AddTodolistAT
  | SetTodolistsAT
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changedTodolistFilterAC>
  | ReturnType<typeof changedTodolistCoverAC>
  | ReturnType<typeof changeEntityStatusAC>
  | ClearTodolistsDataAT
