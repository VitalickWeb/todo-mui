
import {v1} from "uuid";
import {TasksStateType} from "../AppWithRedux";
import {AddTodoListAT, RemoveTodoListAT} from "./TodoList-reducer";

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type addTaskAT = ReturnType<typeof addTaskAC>
export type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

export type ActionsType = RemoveTaskAT | addTaskAT | changeTaskStatusAT | changeTaskTitleAT | RemoveTodoListAT | AddTodoListAT

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todoListID]: [newTask, ...state[action.todoListID]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(tl => tl.id === action.idStatus ? {...tl, isDone: action.isDone} : tl)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(tl => tl.id === action.idStatus ? {...tl, title: action.title} : tl)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoListID]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.todoListID]
            return copyState

        default:
            return state//если ошибка вернет state
    }
}

export const removeTaskAC = (todoListID: string, taskId: string,) => {
    return {type: 'REMOVE-TASK', todoListID, taskId} as const
}
export const addTaskAC = (title: string, todoListID: string) => {
    return {type: 'ADD-TASK', title, todoListID} as const
}
export const changeTaskStatusAC = (todoListID: string, idStatus: string, isDone: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', idStatus, todoListID, isDone} as const
}
export const changeTaskTitleAC = (idStatus: string, todoListID: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', idStatus, todoListID, title} as const
}