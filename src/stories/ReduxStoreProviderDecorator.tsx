import { Provider } from "react-redux";
import { v1 } from "uuid";
import { Action, combineReducers, legacy_createStore, Reducer } from "redux";
import { TodolistActionsType, todolistsReducer } from "../model/todolistsReducer";
import { TaskActionsType, tasksReducer } from "../model/tasksReduser";
import React from "react";
import { TasksType, TaskType, TodoListType } from "../data/dataPropsTypes";

export type RootStateT = {
    tasks: TasksType;
    todolists: TodoListType[];
}

const rootReducer = combineReducers({
    todolists: todolistsReducer as unknown as TodoListType,
    tasks: tasksReducer,
});


export type RootStateTypeNew = ReturnType<typeof rootReducer>

type rootReducerT = Reducer<RootStateTypeNew, Action<string>>

const initialGlobalState: RootStateT = {
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

type ActionType = TaskActionsType & TodolistActionsType;

export const storybookStore = legacy_createStore(rootReducer, initialGlobalState);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storybookStore}>{storyFn()}</Provider>
}

// const rootReducer = combineReducers({
//     tasks: tasksReducer,
//     todolists: todolistsReducer
// })
//
// const initialGlobalState = {
//     todolists: [
//         {id: "todolistId1", title: "What to learn", filter: "all"},
//         {id: "todolistId2", title: "What to buy", filter: "all"}
//     ] ,
//     tasks: {
//         ["todolistId1"]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: false}
//         ],
//         ["todolistId2"]: [
//             {id: v1(), title: "Milk", isDone: false
//             },
//             {id: v1(), title: "React Book", isDone: true}
//         ]
//     }
// };
//
// export const storyBookStore = legacy_createStore
// (rootReducer, initialGlobalState as AppRootState);