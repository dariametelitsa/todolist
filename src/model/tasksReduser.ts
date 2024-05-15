import { TasksType } from "../data/dataPropsTypes";
import { v1 } from "uuid";
import { todolistId1, todolistId2 } from "../data/Data";

export const initialState: TasksType = {
    [todolistId1]: [
        {id: v1(), title: "XP", isDone: false},
        {id: v1(), title: "DDD", isDone: true},
        {id: v1(), title: "Scrum", isDone: false}
    ],
    [todolistId2]: [
        {id: v1(), title: "CSS&HTML", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ]
};

type RemoveTaskAction = ReturnType<typeof removeTaskAC>
type AddTaskAction = ReturnType<typeof addTaskAC>
type RenameTaskTitleAction = ReturnType<typeof renameTaskTitleAC>
type DeleteAllTasksAction = ReturnType<typeof deleteAllTasksAC>
type SetNewTaskStatusAction = ReturnType<typeof setNewTaskStatusAC>
type ActionType = RemoveTaskAction | AddTaskAction | RenameTaskTitleAction | DeleteAllTasksAction | SetNewTaskStatusAction;

export const tasksReduser = (state: TasksType = initialState, action: ActionType): TasksType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)};
        case 'ADD_TASK':
            const newTask = {id: v1(), isDone: false, title: action.payload.title};
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]};
        case 'RENAME_TASK_TITLE':
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)};
        case 'DELETE_ALL_TASKS':
            return {...state, [action.payload.todolistId]: []};
        case 'SET_NEW_TASK_STATUS':
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)};
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

export const deleteAllTasksAC = (todolistId: string) => {
    return {
        type: 'DELETE_ALL_TASKS',
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
}