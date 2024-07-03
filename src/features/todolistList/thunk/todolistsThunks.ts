import { AppThunkType } from '../../../app/store'
import { todolistAPI } from '../../../api/todolist-api'
import { addTodolistAC, changeTodolistTitleAC, deleteTodolistAC, setTodolistsAC } from '../redusers/todolistsReducer'
import { setTasksAC } from '../redusers/tasksReduser'
import { setAppStatusAC } from '../../../app/reducers/appReducer'

export const getTodolistsTC = (): AppThunkType => async (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await todolistAPI.getTodolist()
    dispatch(setTodolistsAC(res.data))
  } catch (e) {
    dispatch(setTodolistsAC([]))
  }
  dispatch(setAppStatusAC('idle'))
}

export const addTodolistTC =
  (title: string): AppThunkType<Promise<void>> =>
  async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
      const todoRes = await todolistAPI.addTodolist(title)
      dispatch(addTodolistAC(todoRes.data.data.item))
      const taskRes = await todolistAPI.getTasks(todoRes.data.data.item.id)
      dispatch(setTasksAC(todoRes.data.data.item.id, taskRes.data.items))
    } catch (e) {
      console.log(e)
    }
    dispatch(setAppStatusAC('idle'))
  }

export const deleteTodolistTC =
  (todolistId: string): AppThunkType =>
  (dispatch) => {
    todolistAPI.deleteTodolist(todolistId).then(() => {
      dispatch(deleteTodolistAC(todolistId))
    })
  }

// type UpdateDomainTodolistModelType = {
//     order: number
//     title: string
// }
export const changeTodolistTitleTC =
  (todolistId: string, title: string): AppThunkType =>
  (dispatch) => {
    todolistAPI.updateTodolist(todolistId, title).then(() => dispatch(changeTodolistTitleAC(todolistId, title)))
  }
