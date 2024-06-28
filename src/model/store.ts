import { AnyAction, applyMiddleware, combineReducers, compose, createStore } from "redux";
import { TodolistActionsType, todolistsReducer } from "./redusers/todolistsReducer";
import { TaskActionsType, tasksReducer } from "./redusers/tasksReduser";
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
//type RootActionsType= TodolistActionsType | TaskActionsType


//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, {}, applyMiddleware(thunk))
export type AppDispatch = typeof store.dispatch
// @ts-ignore
// export const store = createStore(rootReducer, applyMiddleware(thunk), composeEnhancers())

//создаем тип для thunk
export type AppThunkType<ReturnValue = void> = ThunkAction<ReturnValue, AppRootStateType, unknown, AnyAction>


// создаем тип диспатча который принимает как AC так и TC
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>(); //каррирование
// export const useAppDispatch =  useDispatch<AppThunkDispatch>; // так тоже работает

// @ts-ignore
window.store = store;