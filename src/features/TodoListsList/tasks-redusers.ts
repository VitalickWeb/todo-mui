import {AddTodoListAT, RemoveTodoListAT, SetTodoListsAT} from "../TodoListsList/todoList-reducers";
import {ResultCode, taskAPI, TaskApiType, TaskStatuses, UpdateTaskModelType} from "../../API/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {RequestStatusType, SetErrorAT, setStatusAC, SetStatusAT} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            const newTask: TaskDomainType = {...action.task, entityStatus: 'idle'};
            return  {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}
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
        case 'SET-TODO-LISTS':
            const stateCopy = {...state}
            action.todoLists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        case 'SET-TASKS':
            const stateCopy2 = {...state}
            stateCopy2[action.todoListIdApi] = action.tasksApi.map(t => ({...t, entityStatus: 'idle'}))
            return stateCopy2
        case "CHANGE-TASKS-ENTITY-STATUS":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(tl => tl.id === action.taskId ? {
                    ...tl,
                    entityStatus: action.status
                } : tl)
            }

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
    return {type: 'UPDATE-TASK-TITLE', todoListID, idStatus, newTitle} as const
}
export const setTasksAC = (tasksApi: TaskApiType[], todoListIdApi: string) => ({
    type: "SET-TASKS", tasksApi, todoListIdApi}
) as const
export const ChangeTaskEntityStatusAC = (todoListID: string, taskId: string, status: RequestStatusType) => ({
        type: "CHANGE-TASKS-ENTITY-STATUS", todoListID, taskId, status}
) as const
// Thunks
export const fetchTasksThunk = (todoListID: string) => async (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))

    try {
        const res = await taskAPI.getTasks(todoListID)

        if (res.data.error === null) {
            dispatch(setTasksAC(res.data.items, todoListID))
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data.error, dispatch)
        }

    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ? e.response.data.messages[0].message : e.message
            handleServerNetworkError(error, dispatch)
            return;
        }
        const error = (e as Error).message
        handleServerNetworkError(error, dispatch)
    }
}
export const deleteTaskTC = (todoListID: string, taskId: string) => async (dispatch: Dispatch<TaskActionsType>) => {
    dispatch(setStatusAC('loading'))
    dispatch(ChangeTaskEntityStatusAC(todoListID, taskId, 'loading'))

    try {
        const res = await taskAPI.deleteTasks(todoListID, taskId)

        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(removeTaskAC(todoListID, taskId))
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }

    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ? e.response.data.messages[0].message : e.message
            handleServerNetworkError(error, dispatch)
            return;
        }
        const error = (e as Error).message
        handleServerNetworkError(error, dispatch)
    }
}

export const createTaskTC = (title: string, todoListID: string) => async (dispatch: Dispatch<TaskActionsType>) => {
    dispatch(setStatusAC('loading'))

    try {
        const res = await taskAPI.createTasks(todoListID, title)

        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(addTaskAC(res.data.data.item, todoListID))
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError<{item: TaskApiType}>(res.data, dispatch)
        }

    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ? e.response.data.messages[0].message : e.message
            handleServerNetworkError(error, dispatch)
            return;
        }
        const error = (e as Error).message
        handleServerNetworkError(error, dispatch)
    }
}

export const updateTaskStatusTC = (todoListID: string, taskId: string, status: TaskStatuses) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todoListID].find((t) => t.id === taskId)

        if (!task) {
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
        dispatch(ChangeTaskEntityStatusAC(todoListID, taskId, 'loading'))
        try {
            const res = await taskAPI.updateTasks(todoListID, taskId, model)

            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(changeTaskStatusAC(todoListID, taskId, status))
                dispatch(setStatusAC('succeeded'))
                dispatch(ChangeTaskEntityStatusAC(todoListID, taskId, 'succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        } catch (e) {
            if (axios.isAxiosError<ErrorType>(e)) {
                const error = e.response ? e.response.data.messages[0].message : e.message
                handleServerNetworkError(error, dispatch)
                return;
            }
            const error = (e as Error).message
            handleServerNetworkError(error, dispatch)
        }
    }


export const updateTaskTitleTC = (todoListID: string, taskId: string, newTitle: string) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setStatusAC('loading'))
        dispatch(ChangeTaskEntityStatusAC(todoListID, taskId, 'loading'))

        const task = getState().tasks[todoListID].find((t) => t.id === taskId)

        if (task) {
            try {
                const res = await taskAPI.updateTaskTitle(todoListID, taskId, {
                    title: newTitle,
                    description: task.description,
                    status: task.status,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline
                })

                if (res.data.resultCode === ResultCode.SUCCESS) {
                    dispatch(changeTaskTitleAC(todoListID, taskId, newTitle))
                    dispatch(setStatusAC('succeeded'))
                    dispatch(ChangeTaskEntityStatusAC(todoListID, taskId, 'succeeded'))
                } else {
                    dispatch(changeTaskTitleAC(todoListID, taskId, 'ENTER CORRECT TITLE'))
                    handleServerAppError(res.data, dispatch)
                }
            } catch (e) {
                if (axios.isAxiosError<ErrorType>(e)) {
                    const error = e.response ? e.response.data.messages[0].message : e.message
                    handleServerNetworkError(error, dispatch)
                    return;
                }
                const error = (e as Error).message
                handleServerNetworkError(error, dispatch)
            }
        }
    }

// Types
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type SetTasksAT = ReturnType<typeof setTasksAC>
export type ChangeTaskEntityStatusAT = ReturnType<typeof ChangeTaskEntityStatusAC>

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
    | ChangeTaskEntityStatusAT

export type TasksStateType = {
    [todoListID: string]: Array<TaskDomainType>
}
export type TaskDomainType = TaskApiType & {
    entityStatus: RequestStatusType
}

//типизация ошибок
export type ErrorType = {
    'statusCode': number
    messages: [
        {
            'message': string,
            'field': string
        }
    ]
    'error': string
}
//type ThunkDispatch = Dispatch<TaskActionsType | AppActionsType | ErrorUtilsDispatchType>