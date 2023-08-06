import axios from 'axios'


const instanceTodo = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    // headers: {
    //     // Не забываем заменить API-KEY на собственный
    //     'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1',
    // },
})

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<T> = {
    data: T
    "messages": string[],
    "fieldsErrors": string[],
    "resultCode": number
}

export const todolistAPI = {
    getTodoLists() {
        return instanceTodo.get<TodolistType[]>(`todo-lists/`)
    },
    createTodoLists(title: string) {
        return instanceTodo.post<ResponseType<{item: TodolistType}>>(`todo-lists/`, {title: title})
    },
    deleteTodoLists(todoListID: string) {
        return instanceTodo.delete<ResponseType<TodolistType>>(`todo-lists/${todoListID}`)
    },
    updateTodoLists(todoListID: string, title: string) {
        return instanceTodo.put<ResponseType<TodolistType>>(`todo-lists/${todoListID}`, {title: title})
    }
}

const instanceTask = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    // headers: {
    //     // Не забываем заменить API-KEY на собственный
    //     'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1',
    // },
})

export const taskAPI = {
    getTasks(todolistId: string) {
        return instanceTask.get(`todo-lists/${todolistId}/tasks`)
    },
    createTasks(todolistId: string, title: string) {
        return instanceTask.post(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTasks(todoListId: string, taskId: string) {
        return instanceTask.delete(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTasks(todoListID: string, taskId: string, title: string) {
        return instanceTask.put(`todo-lists/${todoListID}/tasks/${taskId}`, {title: title})
    }
}