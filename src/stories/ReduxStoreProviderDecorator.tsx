import { Provider } from "react-redux";
import { v1 } from "uuid";
import { combineReducers, legacy_createStore } from "redux";
import { todolistsReducer } from "../model/todolistsReducer";
import { tasksReducer } from "../model/tasksReduser";
import React from "react";
import { TodoListType } from "../data/dataPropsTypes";


const rootReducer = combineReducers({
    // todolists: todolistsReducer,
    todolists: todolistsReducer as unknown as TodoListType,
    tasks: tasksReducer,
});

type returnReducerType = ReturnType<typeof rootReducer>


const initialGlobalState = {
    tasks: {
        'todolistId1': [
            {id: v1(), title: "XP", isDone: false},
            {id: v1(), title: "DDD", isDone: true},
            {id: v1(), title: "Scrum", isDone: false}
        ],
        'todolistId2': [
            {id: v1(), title: "CSS&HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
    },
    todolists: [
        {id: 'todolistId1', title: "What to learn", filter: 'all'},
        {id: 'todolistId2', title: "What to do", filter: 'all'},
    ]
};

export const storybookStore = legacy_createStore(rootReducer, initialGlobalState as returnReducerType );


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storybookStore}>{storyFn()}</Provider>
}