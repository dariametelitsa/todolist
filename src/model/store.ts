import { combineReducers, createStore, legacy_createStore } from "redux";
import { todolistsReducer } from "./todolistsReducer";
import { tasksReducer } from "./tasksReduser";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;

//export const store = createStore(rootReducer);
export const store = legacy_createStore(rootReducer);


// @ts-ignore
window.store = store;