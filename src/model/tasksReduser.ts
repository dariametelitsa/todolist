import { TasksType } from "../data/dataPropsTypes";
import { v1 } from "uuid";
import { AddTodoActionType, RemoveTodoActionType, SetTodolistsActionType } from "./todolistsReducer";
import { TaskStatuses, TaskType, TodoTaskPriorities } from "../api/todolist-api";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type RenameTaskTitleActionType = ReturnType<typeof renameTaskTitleAC>;
type CleanAllTasksActionType = ReturnType<typeof cleanTasksListAC>;
type SetNewTaskStatusActionType = ReturnType<typeof setNewTaskStatusAC>;

export type TaskActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | RenameTaskTitleActionType
    | CleanAllTasksActionType
    | SetNewTaskStatusActionType
    | AddTodoActionType
    | RemoveTodoActionType
    | SetTodolistsActionType;

export const initialState: TasksType = {};

export const tasksReducer = (state: TasksType = {}, action: TaskActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            };
        case 'ADD_TASK':
            const newTask: TaskType  = {id: v1(), status: TaskStatuses.New, title: action.payload.title, todoListId: action.payload.todolistId, description: '', priority: TodoTaskPriorities.Low, order: 0, addedDate: '', completed: false, startDate: '', deadline: ''};

            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]};
        case 'RENAME_TASK_TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.title
                } : t)
            };
        case 'CLEAN_TASKS_LIST':
            return {...state, [action.payload.todolistId]: []};
        case 'SET_NEW_TASK_STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    completed: action.payload.isDone
                } : t)
            };
        case 'ADD_TODOLIST':
            return {[action.payload.id]: [], ...state};
        case 'REMOVE_TODOLIST':
            const {[action.payload.id]: deletedValue, ...rest} = state;
            return rest;
        case 'SET_TODOLISTS':
            const newState = {...state};
            action.payload.todolists.forEach(tl => {
                newState[tl.id] = [];
            })
            return newState;
        default:
            return state;
    }
};

//ac - action creator
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            todolistId,
            taskId,
        }
    } as const;
};

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todolistId,
            title,
        }
    } as const;
};

export const renameTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'RENAME_TASK_TITLE',
        payload: {
            todolistId,
            taskId,
            title,
        }
    } as const;
};

export const cleanTasksListAC = (todolistId: string) => {
    return {
        type: 'CLEAN_TASKS_LIST',
        payload: {
            todolistId,
        }
    } as const;
};

export const setNewTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'SET_NEW_TASK_STATUS',
        payload: {
            todolistId,
            taskId,
            isDone
        }
    } as const;
};
