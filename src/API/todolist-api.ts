import axios, {AxiosResponse} from 'axios'

//у axios есть метод create для того что бы задавать какие то базовые настройки
//которые будут использоваться ко всем запросам.
const instanceAuth = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    // headers: {
    //     // Не забываем заменить API-KEY на собственный
    //     'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1',
    // },
})

//Types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

type LoginResponseType = {
    resultCode: number
    messages: [],
    data: {
        userId: number
    }
}

export type authMeType = {
    resultCode: number
    messages: []
    data: {
        id: number
        email: string
        login: string
    }
}

export type logoutResponseType = {
    resultCode: number
    messages: string[],
    data: {}
}
//API
export const authAPI = {
    login(data: LoginParamsType): Promise<AxiosResponse> {
        return instanceAuth.post<ResponseType<{userId?: number}>>('auth/login', data)
    },
    me() {
        return instanceAuth.get<ResponseType<{id: number, email: string, login: string}>>('auth/me')
    },
    logout() {
        return instanceAuth.delete<ResponseType>('auth/login')
    }
}


const instanceTodo = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    // headers: {
    //     // Не забываем заменить API-KEY на собственный
    //     'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1',
    // },
})

// types
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

// api
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

// types
export enum ResultCode {
    SUCCESS = 0,
    ERROR = 1,
    CAPTCHA_ERROR = 10
}
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

// api
export const taskAPI = {
    getTasks(todolistId: string):
        Promise<AxiosResponse<ResponseGetTaskType<TaskApiType[]>>> {
        return instanceTask.get(`todo-lists/${todolistId}/tasks`)
    },
    createTasks(todolistId: string, title: string) {
        return instanceTask.post<any, AxiosResponse<ResponseType<{item: TaskApiType}>>, {title: string}>
        (`todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTasks(todoListId: string, taskId: string) {
        return instanceTask.delete<any, AxiosResponse<ResponseType>>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTasks(todoListID: string, taskId: string, model: UpdateTaskModelType):
        Promise<AxiosResponse<ResponseType>> {
        return instanceTask.put(`todo-lists/${todoListID}/tasks/${taskId}`, model)
    },
    updateTaskTitle(todoListID: string, taskId: string, model: UpdateTaskModelType):
        Promise<AxiosResponse<ResponseType>> {
        return instanceTask.put(`todo-lists/${todoListID}/tasks/${taskId}`, model)
    }
}