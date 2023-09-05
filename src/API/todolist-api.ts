import axios, {AxiosResponse} from 'axios'

//у axios есть метод create для того что бы задавать какие то базовые настройки
//которые будут использоваться ко всем запросам.
const instanceTodo = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    // headers: {
    //     // Не забываем заменить API-KEY на собственный
    //     'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1',
    // },
})

export type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<T = {}> = {
    data: T
    "messages": string[],
    "fieldsErrors": string[],
    "resultCode": number
}


export const todolistAPI = {
    getTodoLists(): Promise<AxiosResponse<TodoType[]>> {
        return instanceTodo.get(`todo-lists/`)
    },
    createTodoLists(title: string) {
        return instanceTodo.post<any, AxiosResponse<ResponseType<{item: TodoType}>>, {title: string}>
        (`todo-lists/`,{title})
    },
    deleteTodoLists(todoListID: string): Promise<AxiosResponse<ResponseType>> {
        return instanceTodo.delete(`todo-lists/${todoListID}`)
    },
    updateTodoLists(todoListID: string, title: string): Promise<AxiosResponse<ResponseType>> {
        return instanceTodo.put(`todo-lists/${todoListID}`, {title: title})
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

export enum TaskStatuses {
    new = 0,
    inProgress = 1,
    completed = 2,
    draft = 3,
}

export enum TaskPriorities {
    low = 0,
    middle = 1,
    hi = 2,
    urgently = 3,
    later = 4,
}

export type TaskApiType = {
    "id": string
    "title": string
    "description": string
    "todoListId": string
    "order": number
    "status": TaskStatuses
    "priority": TaskPriorities
    "startDate": string
    "deadline": string
    "addedDate": string
}
export type ResponseGetTaskType<T> = {
    error: null
    items: T
    totalCount: number
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export const taskAPI = {
    getTasks(todolistId: string): Promise<AxiosResponse<ResponseGetTaskType<TaskApiType[]>>> {
        return instanceTask.get(`todo-lists/${todolistId}/tasks`)
    },
    createTasks(todolistId: string, title: string) {
        return instanceTask.post<any, AxiosResponse<ResponseType<{item: TaskApiType}>>, {title: string}>
        (`todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTasks(todoListId: string, taskId: string): Promise<AxiosResponse<ResponseType>> {
        return instanceTask.delete(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTasks(todoListID: string, taskId: string, model: UpdateTaskModelType): Promise<AxiosResponse<ResponseType>> {
        return instanceTask.put(`todo-lists/${todoListID}/tasks/${taskId}`, model)
    },
    updateTaskTitle(todoListID: string, taskId: string, model: UpdateTaskModelType): Promise<AxiosResponse<ResponseType>> {
        return instanceTask.put(`todo-lists/${todoListID}/tasks/${taskId}`, model)
    }
}