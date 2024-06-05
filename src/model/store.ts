import { combineReducers, compose, createStore } from "redux";
import { todolistsReducer } from "./todolistsReducer";
import { tasksReducer } from "./tasksReduser";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;


 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// @ts-ignore
export const store = createStore(rootReducer, composeEnhancers())


// @ts-ignore
window.store = store;