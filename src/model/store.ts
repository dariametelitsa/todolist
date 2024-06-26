import { applyMiddleware, combineReducers, compose, createStore, AnyAction } from "redux";
import { todolistsReducer } from "./todolistsReducer";
import { tasksReducer } from "./tasksReduser";
import { thunk, ThunkDispatch } from "redux-thunk";
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


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, applyMiddleware(thunk) as any)
export type AppDispatch = typeof store.dispatch
// @ts-ignore
// export const store = createStore(rootReducer, applyMiddleware(thunk), composeEnhancers())

// создаем тип диспатча который принимает как AC так и TC
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

// @ts-ignore
window.store = store;