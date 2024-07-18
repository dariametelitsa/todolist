import { applyMiddleware, combineReducers, compose, createStore, UnknownAction } from 'redux'
import { TodolistActionsType, todolistsReducer } from '../features/todolistList/redusers/todolistsReducer'
import { TaskActionsType, tasksReducer } from '../features/todolistList/redusers/tasksReduser'
import { thunk, ThunkAction, ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appReducer } from './reducers/appSlice'
import { authReducer } from '../features/login/reduser/authSlice'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
// export type RootActionsType = TodolistActionsType | TaskActionsType | ActionsGlobalType | ActionsAuthType

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, {}, applyMiddleware(thunk))
export type AppDispatch = typeof store.dispatch
// @ts-ignore
// export const store = createStore(rootReducer, applyMiddleware(thunk), composeEnhancers())

//создаем тип для thunk
export type AppThunkType<ReturnValue = void> = ThunkAction<ReturnValue, AppRootStateType, unknown, UnknownAction>

// создаем тип диспатча который принимает как AC так и TC
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, UnknownAction>
// export const useAppDispatch = () => useDispatch<AppThunkDispatch>(); //каррирование
export const useAppDispatch = useDispatch<AppThunkDispatch> // так тоже работает
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
