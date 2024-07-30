import { combineReducers, compose, UnknownAction } from 'redux';
import { todolistsReducer } from '../features/todolistList/model/todolistsSlice';
import { tasksReducer } from '../features/todolistList/model/tasksSlice';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { appReducer } from './reducers/appSlice';
import { authReducer } from '../features/auth/model/authSlice';
import { configureStore } from '@reduxjs/toolkit';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
// export type RootActionsType = TodolistActionsType | TaskActionsType | ActionsGlobalType | ActionsAuthType

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = createStore(rootReducer, {}, applyMiddleware(thunk))
export const store = configureStore({ reducer: rootReducer });
//export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>;
// @ts-ignore
// export const store = createStore(rootReducer, applyMiddleware(thunk), composeEnhancers())

//создаем тип для thunk
export type AppThunkType<ReturnValue = void> = ThunkAction<ReturnValue, AppRootStateType, unknown, UnknownAction>;

// создаем тип диспатча который принимает как AC так и TC
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, UnknownAction>;
// export const useAppDispatch = () => useDispatch<AppThunkDispatch>(); //каррирование
export const useAppDispatch = useDispatch<AppThunkDispatch>; // так тоже работает
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store;
