import { FilterValuesType, TodoListDomainType } from "../../data/dataPropsTypes";
import { TodolistType } from "../../api/todolist-api";
import { RootActionsType } from "../store";

//action types
export type TodolistActionsType =
    | ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changedTodolistFilterAC>
    | ReturnType<typeof changedTodolistCoverAC>
    | ReturnType<typeof setTodolistsAC>;

const initialState: TodoListDomainType[] = [];

export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: RootActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'DELETE_TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id);
        }
        case 'ADD_TODOLIST': {
            const newTodolist: TodoListDomainType = {...action.payload.todolist, filter: 'all'}
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
        case 'SET_TODOLISTS': {
            return action.payload.todolists.map(tl => {
                return {...tl, filter: 'all'}
            });
        }
        default:
            return state as TodoListDomainType[];
    }
};

//ac - action creator
export const deleteTodolistAC = (id: string) => {
    return {
        type: 'DELETE_TODOLIST',
        payload: {
            id,
        },
    } as const;
};

export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            todolist
        },
    } as const;
};

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {id, title},
    } as const;
};

export const changedTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {id, filter},
    } as const;
};

export const changedTodolistCoverAC = (id: string, coverImage: string) => {
    return {
        type: 'CHANGE_TODOLIST_COVER' as 'CHANGE_TODOLIST_COVER',
        payload: {id, coverImage},
    } as const;
};

export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET_TODOLISTS',
        payload: {todolists},
    } as const;
};


