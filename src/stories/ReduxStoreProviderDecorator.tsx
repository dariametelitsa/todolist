import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { todolistsReducer } from "../features/todolistList/redusers/todolistsReducer";
import { tasksReducer } from "../features/todolistList/redusers/tasksReduser";
import React from "react";
import { thunk } from "redux-thunk";
import { TaskStatuses, TodoTaskPriorities } from "../api/todolist-api";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
});

type returnReducerType = ReturnType<typeof rootReducer>

const initialGlobalState = {
    tasks: {
        'todolistId1': [
            {id: '1', status: TaskStatuses.New, title: 'XP', todoListId: 'todolistId1', description: '', priority: TodoTaskPriorities.Low, order: 0, addedDate: '', startDate: '', deadline: ''},
            {id: '2', status: TaskStatuses.Completed, title: 'DDD', todoListId: 'todolistId1', description: '', priority: TodoTaskPriorities.Low, order: 0, addedDate: '', startDate: '', deadline: ''},
            {id: '3', status: TaskStatuses.New, title: 'Scrum', todoListId: 'todolistId1', description: '', priority: TodoTaskPriorities.Low, order: 0, addedDate: '', startDate: '', deadline: ''},
        ],
        'todolistId2': [
            {id: '1', status: TaskStatuses.New, title: 'CSS&HTML', todoListId: 'todolistId2', description: '', priority: TodoTaskPriorities.Low, order: 0, addedDate: '', startDate: '', deadline: ''},
            {id: '2', status: TaskStatuses.Completed, title: 'JS', todoListId: 'todolistId2', description: '', priority: TodoTaskPriorities.Low, order: 0, addedDate: '', startDate: '', deadline: ''},
        ]
    },
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: Date(), order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: Date(), order: 0},
    ]
} as returnReducerType;

export const storybookStore = legacy_createStore(rootReducer, initialGlobalState as any , applyMiddleware(thunk));


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storybookStore}>{storyFn()}</Provider>
}
