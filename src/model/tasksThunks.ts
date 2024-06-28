import { TaskStatuses, todolistAPI, TodoTaskPriorities, UpdateTaskModelType } from "../api/todolist-api";
import { AppThunkType } from "./store";
import { addTaskAC, removeTaskAC, setTasksAC, updateTaskAC } from "./tasksReduser";


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
            })
    }
}