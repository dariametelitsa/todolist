import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../data/dataPropsTypes";

//action types
export type RemoveTodoAction = ReturnType<typeof removeTodolistAC>;
export type AddTodoAction = ReturnType<typeof addedTodolistAC>;
type ChangeTodoTitleAction = ReturnType<typeof changeTodolistTitleAC>;
type ChangeTodoFilterAction = ReturnType<typeof changedTodolistFilterAC>;
type ChangeTodoCoverAction = ReturnType<typeof changedTodolistCoverAC>;

export type TodolistActionsType =  | RemoveTodoAction  | AddTodoAction  | ChangeTodoTitleAction  | ChangeTodoFilterAction | ChangeTodoCoverAction;

const initialState: TodoListType[] = [];

export const todolistsReducer = (state: Array<TodoListType> = [], action: TodolistActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id);
        }
        case 'ADD_TODOLIST': {
            const newTodolist: TodoListType = {id: action.payload.id, title: action.payload.title, filter: 'all'};
            return [newTodolist, ...state];
        }
        case 'CHANGE_TODOLIST_TITLE': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl);
        }
        case 'CHANGE_TODOLIST_FILTER': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl);
        }
        case 'CHANGE_TODOLIST_COVER': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, coverImage: action.payload.coverImage} : tl);
        }
        default:
            return state as TodoListType[];
    }
};

//ac - action creator
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            id,
        },
    } as const;
};

export const addedTodolistAC = ( title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            id: v1(),
            title,
        },
    } as const;
};

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: { id, title},
    } as const;
};

export const changedTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: { id, filter},
    } as const;
};

export const changedTodolistCoverAC = (id: string, coverImage: string) => {
    return {
        type: 'CHANGE_TODOLIST_COVER' as 'CHANGE_TODOLIST_COVER',
        payload: { id, coverImage},
    } as const;
};