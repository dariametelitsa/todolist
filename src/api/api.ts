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
    createTodolist: (title: string) => {
        return instance.post<ResponseType>('/todo-lists', {title});
    },
    deleteTodolist: (todoId: string) => {
        return instance.delete<ResponseType<CreateTodoType>>(`/todo-lists/${todoId}`);
    },
    updateTodolist: (todoId: string, title: string) => {
        return instance.put<ResponseType>(`/todo-lists/${todoId}`, {title});
    }
};


type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type ResponseType<T = {}> = {
    data: T
    fieldsErrors: []
    messages: string[]
    resultCode: number
}

type CreateTodoType = {
    "item": TodolistType
}