import { TaskStatuses, todolistAPI, TodoTaskPriorities, UpdateTaskModelType } from '../../../api/todolist-api'
import { AppThunkType } from '../../../app/store'
import { addTaskAC, cleanTasksListAC, deleteTaskAC, setTasksAC, updateTaskAC } from '../redusers/tasksReduser'
import { setAppErrorAC, setAppStatusAC } from '../../../app/reducers/appReducer'

export const getTasksTC =
  (todolistId: string): AppThunkType =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI
      .getTasks(todolistId)
      .then((res) => {
        dispatch(setTasksAC(todolistId, res.data.items))
      })
      .catch((rej) => {
        console.log(rej)
        dispatch(setTasksAC(todolistId, []))
      })
      .finally(() => {
        dispatch(setAppStatusAC('idle'))
      })
  }

export const deleteTaskTC =
  (todolistId: string, taskId: string): AppThunkType =>
  (dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId).then(() => {
      dispatch(deleteTaskAC(todolistId, taskId))
    })
  }

export const addTaskTC =
  (todoId: string, title: string): AppThunkType =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI
      .addTask(todoId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(addTaskAC(res.data.data.item))
        } else {
          if (res.data.messages.length) {
            dispatch(setAppErrorAC(res.data.messages[0]))
          } else {
            dispatch(setAppErrorAC('Some error occurred'))
          }
          dispatch(setAppStatusAC('failed'))
        }
      })
      .catch((rej) => {})
      .finally(() => {
        dispatch(setAppStatusAC('idle'))
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

export const updateTaskTC =
  (todoId: string, taskId: string, model: UpdateDomainTaskModelType): AppThunkType =>
  (dispatch, getState) => {
    const task = getState().tasks[todoId].find((t) => t.id === taskId)
    if (task) {
      const apiModel: UpdateTaskModelType = { ...task, ...model }
      todolistAPI.updateTask(todoId, taskId, apiModel).then((res) => {
        dispatch(updateTaskAC(todoId, taskId, res.data.data.item))
      })
    }
  }

export const cleanTasksListTC =
  (todolistId: string): AppThunkType =>
  async (dispatch, getState) => {
    const tasks = getState().tasks[todolistId]
    const requests = tasks.map((t) => todolistAPI.deleteTask(todolistId, t.id))
    Promise.all(requests)
      .then(() => dispatch(cleanTasksListAC(todolistId)))
      .catch((rej) => console.log(rej))
  }
