import { combineReducers, createStore } from "redux";
import { todolistsReducer } from "./todolistsReducer";
import { tasksReducer } from "./tasksReduser";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);


// @ts-ignore
window.store = store;