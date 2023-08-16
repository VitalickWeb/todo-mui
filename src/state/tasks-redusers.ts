import {AddTodoListAT, RemoveTodoListAT, setTodoListsAT} from "./todoList-reducers";
import {taskAPI, TaskApiType, TaskStatuses} from "../API/todolist-api";
import {Dispatch} from "redux";

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type addTaskAT = ReturnType<typeof addTaskAC>
export type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type setTasksAT = ReturnType<typeof setTasksAC>

export type TasksStateType = {
    [todoListID: string]: Array<TaskApiType>
}

export type TaskActionsType =
    | RemoveTaskAT
    | addTaskAT
    | changeTaskStatusAT
    | changeTaskTitleAT
    | setTasksAT

    | RemoveTodoListAT
    | AddTodoListAT
    | setTodoListsAT


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskId)
            }

        case 'ADD-TASK':
            return <TasksStateType>{
                ...state,
                [action.todoListID]: [action.title, ...state[action.todoListID]]
            }

        case 'CHANGE-TASK-STATUS':
            return <TasksStateType>{
                ...state,
                [action.todoListID]: state[action.todoListID].map(tl => tl.id === action.idStatus ? {
                    ...tl,
                    status: action.status
                } : tl)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(tl => tl.id === action.idStatus ? {
                    ...tl,
                    title: action.title
                } : tl)
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

        case 'SET-TODO-LISTS': {
            const stateCopy = {...state}
            action.todoLists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }

        case 'SET-TASKS':
            const stateCopy = {...state}
            stateCopy[action.todoListIdApi] = action.tasksApi
            return stateCopy


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
export const changeTaskStatusAC = (todoListID: string, idStatus: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', idStatus, todoListID, status} as const
}
export const changeTaskTitleAC = (idStatus: string, todoListID: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', idStatus, todoListID, title} as const
}

export const setTasksAC = (tasksApi: TaskApiType[], todoListIdApi: string) => ({
    type: "SET-TASKS", tasksApi, todoListIdApi}
) as const


//====Thunks====//

export const fetchTasksThunk = (todoListId: string) => (dispatch: Dispatch) => {
    taskAPI.getTasks(todoListId).then((res) => {
        const tasks = res.data.items
        dispatch(setTasksAC(tasks, todoListId))
    })
}

export const deleteTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    taskAPI.deleteTasks(todoListId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(todoListId, taskId))
        })
}

export const createTaskTC = (title: string, todoListID: string) => (dispatch: Dispatch) => {
    taskAPI.createTasks(todoListID, title)
        .then((res) => {
            dispatch(addTaskAC(title, todoListID))
        })
}