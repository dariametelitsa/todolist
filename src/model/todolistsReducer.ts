import { v1 } from "uuid";
import { FilterValuesType, TodoListDomainType } from "../data/dataPropsTypes";
import { todolistAPI, TodolistType } from "../api/todolist-api";
import { AppThunkType } from "./store";

//action types
export type RemoveTodoActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodoActionType = ReturnType<typeof addedTodolistAC>;
type ChangeTodoTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
type ChangeTodoFilterActionType = ReturnType<typeof changedTodolistFilterAC>;
type ChangeTodoCoverActionType = ReturnType<typeof changedTodolistCoverAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type TodolistActionsType =
    | RemoveTodoActionType
    | AddTodoActionType
    | ChangeTodoTitleActionType
    | ChangeTodoFilterActionType
    | ChangeTodoCoverActionType
    | SetTodolistsActionType;

const initialState: TodoListDomainType[] = [];

export const todolistsReducer = (state: Array<TodoListDomainType> = [], action: TodolistActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id);
        }
        case 'ADD_TODOLIST': {
            const newTodolist: TodoListDomainType = {
                id: action.payload.id,
                title: action.payload.title,
                filter: 'all',
                addedDate: Date(),
                order: 0
            };
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
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            id,
        },
    } as const;
};

export const addedTodolistAC = (title: string) => {
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


//пример типирования thunk и dispatch
// export const fetchTodolistsTC = (): AppThunkType  => {
//     return (dispatch: Dispatch<TodolistActionsType>) => {
//         todolistAPI.getTodolist()
//             .then(res => {
//                 dispatch(setTodolistsAC(res.data));
//             })
//             .catch(err => {
//                 console.log(err);
//                 dispatch(setTodolistsAC([]));
//             })
//     }
// }

export const getTodolistsTC = (): AppThunkType => async dispatch => {
    try{
        const res = await todolistAPI.getTodolist();
        dispatch(setTodolistsAC(res.data));
    }
    catch (e: unknown) {
        dispatch(setTodolistsAC([]));
    }
}

export const addTodolistTC = (title: string) => {

}

