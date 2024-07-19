import axios, { AxiosResponse } from 'axios'
import { LoginType } from '../features/login/Login'

// const config = {
//     withCredentials: true,
//     headers: {
//         "API-KEY": '1c0d9a02-17ae-40c8-8a16-b7733f0e908d'
//     }
// };
const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  withCredentials: true,
  headers: {
    'API-KEY': '1c0d9a02-17ae-40c8-8a16-b7733f0e908d',
  },
})

//api
export const todolistAPI = {
  getTodolist: () => {
    return instance.get<Array<TodolistType>>('/todo-lists')
  },
  addTodolist: (title: string) => {
    return instance.post<ResponseType<{ item: TodolistType }>, AxiosResponse<ResponseType<{ item: TodolistType }>>>(
      '/todo-lists',
      { title }
    )
  },
  deleteTodolist: (todoId: string) => {
    return instance.delete<ResponseType, AxiosResponse<ResponseType>>(`/todo-lists/${todoId}`)
  },
  updateTodolist: (todoId: string, title: string) => {
    return instance.put<ResponseType, AxiosResponse<ResponseType>>(`/todo-lists/${todoId}`, { title })
  },
  getTasks: (todoId: string) => {
    return instance.get<ResponseTypeGetTask>(`/todo-lists/${todoId}/tasks`)
  },
  addTask: (todoId: string, title: string) => {
    return instance.post<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>>(
      `/todo-lists/${todoId}/tasks`,
      { todolistId: todoId, title }
    )
  },
  deleteTask: (todoId: string, taskId: string) => {
    return instance.delete<ResponseType, AxiosResponse<ResponseType>>(`/todo-lists/${todoId}/tasks/${taskId}`)
  },
  updateTask: (todoId: string, taskId: string, model: UpdateTaskModelType) => {
    return instance.put<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>>(
      `/todo-lists/${todoId}/tasks/${taskId}`,
      { ...model }
    )
  },
}

//api
export const authAPI = {
  login(data: LoginType) {
    return instance.post<ResponseType<{ userId: number }>>('auth/login', data)
  },
  me() {
    return instance.get<ResponseType<UserType>>('auth/me')
  },
  logOut() {
    console.log('logOut API')
    return instance.delete<ResponseType>('auth/login')
  },
}

//enum
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TodoTaskPriorities {
  Low = 0,
  Middle = 1,
  High = 2,
  Urgently = 3,
  Later = 4,
}

//types
export type TodolistType = {
  addedDate: string
  id: string
  order: number
  title: string
}
export type ResponseType<T = {}> = {
  data: T
  fieldsErrors?: []
  messages: string[]
  resultCode: number
}
export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TodoTaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type UpdateTaskModelType = {
  title: string
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
  addedDate: string
}
export type ResponseTypeGetTask = {
  items: TaskType[]
  totalCount: number
  error: string
}

export type ErrorResponseType = {
  statusCode: number
  messages: [
    {
      message: string
      field: string
    },
  ]
  error: string
}

type UserType = {
  id: number
  login: string
  email: string
}
