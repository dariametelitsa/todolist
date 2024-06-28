import { TasksType } from "../data/dataPropsTypes";
import { AddTodoActionType, RemoveTodoActionType, SetTodolistsActionType } from "./todolistsReducer";
import { TaskType } from "../api/todolist-api";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type CleanAllTasksActionType = ReturnType<typeof cleanTasksListAC>;
type SetTasksActionType = ReturnType<typeof setTasksAC>
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

export type TaskActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | CleanAllTasksActionType
    | AddTodoActionType
    | RemoveTodoActionType
    | SetTodolistsActionType
    | SetTasksActionType
    | UpdateTaskActionType

export const initialState: TasksType = {};

export const tasksReducer = (state: TasksType = {}, action: TaskActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            };
        case 'ADD_TASK':
            // const newTask: TaskType = {
            //     id: v1(),
            //     status: TaskStatuses.New,
            //     title: action.payload.title,
            //     todoListId: action.payload.todolistId,
            //     description: '',
            //     priority: TodoTaskPriorities.Low,
            //     order: 0,
            //     addedDate: '',
            //     completed: false,
            //     startDate: '',
            //     deadline: ''
            // };
            //return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]};
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        case 'CLEAN_TASKS_LIST':
            return {...state, [action.payload.todolistId]: []};
        case 'ADD_TODOLIST':
            return {[action.payload.id]: [], ...state};
        case 'REMOVE_TODOLIST':
            const {[action.payload.id]: deletedValue, ...rest} = state;
            return rest;
        case 'SET_TODOLISTS':
            // const newState = {...state};
            // action.payload.todolists.forEach(tl => {
            //     newState[tl.id] = [];
            // })
            // return newState
            return action.payload.todolists.reduce((acc, tl) => {
                //return {...acc, [tl.id]: []};
                (acc[tl.id] = [])
                return acc
            }, state)
        case "SET_TASKS": {
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        }
        case "UPDATE_TASKS": {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => {
                return t.id === action.payload.taskId ? action.payload.task : t;
                })}
        }
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

export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD_TASK',
        payload: {
            task
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

export const updateTaskAC = (todolistId: string, taskId: string, task: TaskType) => {
    return {
        type: 'UPDATE_TASKS',
        payload: {todolistId, taskId, task}
    } as const;
}

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
    type: 'SET_TASKS',
    payload: {todolistId, tasks}
} as const)

