import { TasksType } from "../data/dataPropsTypes";
import { AddTodoActionType, RemoveTodoActionType, SetTodolistsActionType } from "./todolistsReducer";
import { TaskStatuses, TaskType, todolistAPI, TodoTaskPriorities, UpdateTaskModelType } from "../api/todolist-api";
import { AppThunkType } from "./store";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type RenameTaskTitleActionType = ReturnType<typeof renameTaskTitleAC>;
type CleanAllTasksActionType = ReturnType<typeof cleanTasksListAC>;
type SetNewTaskStatusActionType = ReturnType<typeof setNewTaskStatusAC>;
type setTasksActionType = ReturnType<typeof setTasksAC>
type updateTaskActionType = ReturnType<typeof updateTaskAC>

export type TaskActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | RenameTaskTitleActionType
    | CleanAllTasksActionType
    | SetNewTaskStatusActionType
    | AddTodoActionType
    | RemoveTodoActionType
    | SetTodolistsActionType
    | setTasksActionType
    | updateTaskActionType

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
        // case 'RENAME_TASK_TITLE':
        //     return {
        //         ...state,
        //         [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
        //             ...t,
        //             title: action.payload.title
        //         } : t)
        //     };
        case 'CLEAN_TASKS_LIST':
            return {...state, [action.payload.todolistId]: []};
        // case 'SET_NEW_TASK_STATUS':
        //     return {
        //         ...state,
        //         [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
        //             ...t,
        //             completed: action.payload.isDone
        //         } : t)
        //     };
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

export const getTasksTC = (todoId: string): AppThunkType => dispatch => {
    todolistAPI.getTasks(todoId)
        .then(res => {
            console.log(res.data.items[0])
            dispatch(setTasksAC(todoId, res.data.items));
        })
};

export const deleteTaskTC = (todolistId: string, taskId: string): AppThunkType => dispatch => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId));
        })
}

export const addTaskTC = (todoId: string, title: string): AppThunkType => dispatch => {
    todolistAPI.createTask(todoId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item));
        })
}

type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TodoTaskPriorities
    startDate?: string
    deadline?: string
    addedDate?: string
}
export const updateTaskTC = (todoId: string, taskId: string, model: UpdateDomainTaskModelType): AppThunkType => (dispatch, getState) => {
    const task = getState().tasks[todoId].find(t => t.id === taskId);
    if (task) {
        const apiModel: UpdateTaskModelType = {...task, ...model}
        debugger
        todolistAPI.updateTask(todoId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(todoId, taskId, res.data.data.item))
                //todo action and case for update
            })
    }
}
