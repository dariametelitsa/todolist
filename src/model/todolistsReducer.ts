import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../data/dataPropsTypes";

//action types
export type RemoveTodoAction = ReturnType<typeof removeTodolistAC>;
export type AddTodoAction = ReturnType<typeof addedTodolistAC>;
type ChangeTodoTitleAction = ReturnType<typeof changeTodolistTitleAC>;
type ChangeTodoFilterAction = ReturnType<typeof changedTodolistFilterAC>;
type ActionsNewType =  | RemoveTodoAction  | AddTodoAction  | ChangeTodoTitleAction  | ChangeTodoFilterAction;

//code
let todolistID1 = v1();
let todolistID2 = v1();
const initialState: TodoListType[] = [
    {
        id: todolistID1,
        title: 'What to learn',
        filter: 'all'
    },
    {
        id: todolistID2,
        title: 'What to buy',
        filter: 'all'
    },
];

export const todolistsReducer = (state: TodoListType[] = initialState, action: ActionsNewType): TodoListType[] => {
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
        default:
            return state;
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