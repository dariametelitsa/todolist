import { Provider } from "react-redux";
import { AppRootState } from "../model/store";
import { v1, v4 } from "uuid";
import { combineReducers, createStore, legacy_createStore } from "redux";
import { todolistsReducer } from "../model/todolistsReducer";
import { tasksReducer } from "../model/tasksReduser";
import React from "react";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
});

const initialGlobalState: AppRootState | undefined = {
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: "XP", isDone: false},
            {id: v1(), title: "DDD", isDone: true},
            {id: v1(), title: "Scrum", isDone: false}
        ],
        ['todolistId2']: [
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

// export const storybookStore = legacy_createStore(rootReducer, initialGlobalState);
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