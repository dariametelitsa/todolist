import { TasksType } from '../../../data/dataPropsTypes'
import { TaskType } from '../../../api/todolist-api'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addTodolist, clearTodolistsData, deleteTodolist, setTodolists } from './todolistsSlice'

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksType,
  reducers: {
    deleteTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) tasks.splice(index, 1)
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    },
    cleanTasksList: (state, action: PayloadAction<{ todolistId: string }>) => {
      state[action.payload.todolistId] = []
    },
    updateTask: (state, action: PayloadAction<{ todolistId: string; taskId: string; task: TaskType }>) => {
      const tasks = state[action.payload.task.todoListId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.task }
    },
    setTasks: (state, action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>) => {
      state[action.payload.todolistId] = action.payload.tasks
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(deleteTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(setTodolists, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(clearTodolistsData, (state, action) => {
        return {}
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const { deleteTask, addTask, cleanTasksList, updateTask, setTasks } = slice.actions
export const tasksReducer = slice.reducer
export const { selectTasks } = slice.selectors

export const selectTasksForTodolist = createSelector(
  [selectTasks, (state, todolistId) => todolistId],
  (tasksList, todolistId) => tasksList[todolistId] || []
)
