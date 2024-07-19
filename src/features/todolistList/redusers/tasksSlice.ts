import { TasksType } from '../../../data/dataPropsTypes'
import { TaskType } from '../../../api/todolist-api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addTodolist, clearTodolistsData, deleteTodolist, setTodolists } from './todolistsSlice'
// import { AddTodolistAT, ClearTodolistsDataAT, DeleteTodolistAT, SetTodolistsAT } from './todolistsSlice'

const slice = createSlice({
  name: 'task',
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
        Object.keys(state).forEach((id) => {
          delete state[id]
        })
      })
  },
})

export const { deleteTask, addTask, cleanTasksList, updateTask, setTasks } = slice.actions
export const tasksReducer = slice.reducer

// export const initialState: TasksType = {}

// export const _tasksReducer = (state = initialState, action: TaskActionsType): TasksType => {
//   switch (action.type) {
//     case 'DELETE_TASK':
//       return {
//         ...state,
//         [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
//       }
//     case 'ADD_TASK':
//       return {
//         ...state,
//         [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]],
//       }
//     case 'CLEAN_TASKS_LIST':
//       return { ...state, [action.payload.todolistId]: [] }
//     case 'ADD_TODOLIST':
//       return { [action.payload.todolist.id]: [], ...state }
//     case 'DELETE_TODOLIST':
//       const { [action.payload.id]: deletedValue, ...rest } = state
//       return rest
//     case 'SET_TODOLISTS':
//       // const newState = {...state};
//       // action.payload.todolists.forEach(tl => {
//       //     newState[tl.id] = [];
//       // })
//       // return newState
//       return action.payload.todolists.reduce((acc, tl) => {
//         return { ...acc, [tl.id]: [] }
//       }, state)
//     case 'SET_TASKS': {
//       return { ...state, [action.payload.todolistId]: action.payload.tasks }
//     }
//     case 'UPDATE_TASKS': {
//       return {
//         ...state,
//         [action.payload.todolistId]: state[action.payload.todolistId].map((t) => {
//           return t.id === action.payload.taskId ? action.payload.task : t
//         }),
//       }
//     }
//     case 'CLEAR_DATA': {
//       return {}
//     }
//     default:
//       return state
//   }
// }
//
// //ac - action creator
// export const deleteTaskAC = (todolistId: string, taskId: string) =>
//   ({ type: 'DELETE_TASK', payload: { todolistId, taskId } }) as const
//
// export const addTaskAC = (task: TaskType) => ({ type: 'ADD_TASK', payload: { task } }) as const
//
// export const cleanTasksListAC = (todolistId: string) => ({ type: 'CLEAN_TASKS_LIST', payload: { todolistId } }) as const
//
// export const updateTaskAC = (todolistId: string, taskId: string, task: TaskType) =>
//   ({ type: 'UPDATE_TASKS', payload: { todolistId, taskId, task } }) as const
//
// export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
//   ({ type: 'SET_TASKS', payload: { todolistId, tasks } }) as const
//
// // //types
// // export type TaskActionsType =
// //   | ReturnType<typeof deleteTaskAC>
// //   | ReturnType<typeof addTaskAC>
// //   | ReturnType<typeof cleanTasksListAC>
// //   | ReturnType<typeof setTasksAC>
// //   | ReturnType<typeof updateTaskAC>
// //   | DeleteTodolistAT
// //   | SetTodolistsAT
// //   | AddTodolistAT
// //   | ClearTodolistsDataAT
