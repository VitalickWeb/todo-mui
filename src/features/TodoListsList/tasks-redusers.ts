import {AddTodoListAT, RemoveTodoListAT, SetTodoListsAT} from "../TodoListsList/todoList-reducers";
import {
    ResponseType,
    ResultCode,
    taskAPI,
    TaskApiType,
    TaskStatuses,
    UpdateTaskModelType
} from "../../API/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {setErrorAC, SetErrorAT, setStatusAC, SetStatusAT} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosResponse} from "axios";

export type TasksStateType = {
    [todoListID: string]: Array<TaskApiType>
}
const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return  {
                ...state,
                [action.todoListID]: [action.task, ...state[action.todoListID]]
            }
        case 'UPDATE-TASK-STATUS':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(tl => tl.id === action.idStatus ? {
                    ...tl,
                    status: action.status
                } : tl)
            }
        case 'UPDATE-TASK-TITLE':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(tl => tl.id === action.idStatus ? {
                    ...tl,
                    title: action.newTitle
                } : tl)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todoListID.id]: []};
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
// Actions
export const removeTaskAC = (todoListID: string, taskId: string,) => {
    return {type: 'REMOVE-TASK', todoListID, taskId} as const
}
export const addTaskAC = (task: TaskApiType, todoListID: string) => {
    return {type: 'ADD-TASK', task, todoListID} as const
}
export const changeTaskStatusAC = (todoListID: string, idStatus: string, status: TaskStatuses) => {
    return {type: 'UPDATE-TASK-STATUS', todoListID, idStatus, status} as const
}
export const changeTaskTitleAC = (todoListID: string, idStatus: string, newTitle: string) => {
    return {type: 'UPDATE-TASK-TITLE', idStatus, todoListID, newTitle} as const
}
export const setTasksAC = (tasksApi: TaskApiType[], todoListIdApi: string) => ({
    type: "SET-TASKS", tasksApi, todoListIdApi}
) as const

// Thunks
export const fetchTasksThunk = (todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    taskAPI.getTasks(todoListID)
        .then((res) => {
            if (res.data.error === null) {
                dispatch(setTasksAC(res.data.items, todoListID))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data.error, dispatch)
            }
        })
        .catch((e) => {
            handleServerNetworkError(e.message, dispatch)
        })
}
export const deleteTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    taskAPI.deleteTasks(todoListId, taskId)
        .then((res) => {
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(removeTaskAC(todoListId, taskId))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e) => {
            handleServerNetworkError(e.message, dispatch)
        })
}
export const createTaskTC = (title: string, todoListID: string) => (dispatch: Dispatch<TaskActionsType>) => {
    dispatch(setStatusAC('loading'))
    taskAPI.createTasks(todoListID, title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(addTaskAC(res.data.data.item, todoListID))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError<{item: TaskApiType}>(res.data, dispatch)
            }
        })
        .catch( (e) => {
            handleServerNetworkError(e.message, dispatch)
        })
}
export const updateTaskStatusTC = (todoListID: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todoListID].find((t) => t.id === taskId)

    if(!task) {
        console.log('task not found')
        return
    }

    const model: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline
    }

    dispatch(setStatusAC('loading'))
    taskAPI.updateTasks(todoListID, taskId, model)
        .then((res) => {
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(changeTaskStatusAC(todoListID, taskId, status))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch( (e) => {
            handleServerNetworkError(e.message, dispatch)
        })
}
export const updateTaskTitleTC = (todoListID: string, taskId: string, newTitle: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setStatusAC('loading'))
        const task = getState().tasks[todoListID].find((t) => t.id === taskId)

        if (task) {
            const res = taskAPI.updateTaskTitle(todoListID, taskId, {
                title: newTitle,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline
            })
            .then((res) => {
                if (res.data.resultCode === ResultCode.SUCCESS) {
                    dispatch(changeTaskTitleAC(todoListID, taskId, newTitle))
                    dispatch(setStatusAC('succeeded'))
                } else {
                    dispatch(changeTaskTitleAC(todoListID, taskId, 'ENTER CORRECT TITLE'))
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch( (e) => {
                handleServerNetworkError(e.message, dispatch)
            })
        }
    }

// Types
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type SetTasksAT = ReturnType<typeof setTasksAC>

export type TaskActionsType =
    | RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | SetTasksAT
    | RemoveTodoListAT
    | AddTodoListAT
    | SetTodoListsAT
    | SetStatusAT
    | SetErrorAT
