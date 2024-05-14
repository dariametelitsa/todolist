import { v1 } from "uuid";
import { FilterValuesType, todoListType } from "../data/dataPropsTypes";


//types
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
};

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
    }
};

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
};

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }
};

// type ActionsType =  | RemoveTodolistActionType  | AddTodolistActionType  | ChangeTodolistTitleActionType  | ChangeTodolistFilterActionType;
type ActionsNewType =  | RemoveTodoAction  | AddTodoAction  | ChangeTodoTitleAction  | ChangeTodoFilterAction;


//code
let todolistID1 = v1();
let todolistID2 = v1();
const initialState: todoListType[] = [
    {
        id: todolistID1,
        title: 'What to learn',
        filter: 'all'
    },
    {
        id: todolistID2,
        title: 'What to buy',
        filter: 'all'
    },]

export const todolistsReducer = (state: todoListType[] = initialState, action: ActionsNewType): todoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id);
        }
        case 'ADD-TODOLIST': {
            const newTodolistId = v1();
            const newTodolist: todoListType = {id: newTodolistId, title: action.payload.title, filter: 'all'};
            return [newTodolist, ...state];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl);
        }
        case 'CHANGE-TODOLIST-FILTER': {

            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl);
        }
        default:
            return state;
    }
};

//ac - action creator
//type removeTodolistAC2 = ReturnType<typeof removeTodolistAC>
type RemoveTodoAction = ReturnType<typeof removeTodolistAC>;
type AddTodoAction = ReturnType<typeof addedTodolistAC>;
type ChangeTodoTitleAction = ReturnType<typeof changeTodolistTitleAC>;
type ChangeTodoFilterAction = ReturnType<typeof changedTodolistFilterAC>;


export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id,
        },
    }
};

export const addedTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title: 'New Todolist',
        },
    }
};

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: { id, title},
    }
};

export const changedTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: { id, filter},
    }
};