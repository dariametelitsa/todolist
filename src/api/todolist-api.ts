import axios from "axios";

// const config = {
//     withCredentials: true,
//     headers: {
//         "API-KEY": '1c0d9a02-17ae-40c8-8a16-b7733f0e908d'
//     }
// }

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": '1c0d9a02-17ae-40c8-8a16-b7733f0e908d'
    }
})

export const todolistAPI = {
    getTodolist: () => {
        return instance.get<Array<TodolistType>>('/todo-lists');
    },
    addTodolist: (title: string) => {
        return instance.post<ResponseType<{item: TodolistType}>>('/todo-lists', {title});
    },
    deleteTodolist: (todoId: string) => {
        return instance.delete<ResponseType>(`/todo-lists/${todoId}`);
    },
    updateTodolist: (todoId: string, title: string) => {
        return instance.put<ResponseType>(`/todo-lists/${todoId}`, {title});
    },
    getTasks: (todoId: string) => {
        return instance.get<ResponceTypeGetTask>(`/todo-lists/${todoId}/tasks`);
    },
    addTask: (todoId: string, title: string) => {
        return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todoId}/tasks`, {todolistId: todoId, title});
    },
    deleteTask: (todoId: string, taskId: string) => {
        return instance.delete<ResponseType>(`/todo-lists/${todoId}/tasks/${taskId}`);
    },
    updateTask: (todoId: string, taskId: string, model: UpdateTaskModelType) => {
        return instance.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todoId}/tasks/${taskId}`,{...model});
    },
};


export type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type ResponseType<T = {}> = {
    data: T
    fieldsErrors?: []
    messages: string[]
    resultCode: number
}

type CreateTodoType = {
    "item": TodolistType
}

export enum TaskStatuses {
    New = 0 ,
    InProgress = 1 ,
    Completed = 2,
    Draft = 3
}

export enum TodoTaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
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

export type ResponceTypeGetTask = {
    items: TaskType[]
    totalCount: number
    error: string
}