import {AddTodoListAT, RemoveTodoListAT, setTodoListsAT} from "./todoList-reducers";
import {taskAPI, TaskApiType, TaskStatuses, UpdateTaskModelType} from "../API/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

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
            return  {
                ...state,
                [action.todoListID]: [action.task, ...state[action.todoListID]]
            }

        case 'CHANGE-TASK-STATUS':
            return {
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
                    title: action.newTitle
                } : tl)
            }
        case "ADD-TODOLIST":
            //console.log({...state, [String(action.todoListID.id)]: []})
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

export const removeTaskAC = (todoListID: string, taskId: string,) => {
    return {type: 'REMOVE-TASK', todoListID, taskId} as const
}
export const addTaskAC = (task: TaskApiType, todoListID: string) => {
    return {type: 'ADD-TASK', task, todoListID} as const
}
export const changeTaskStatusAC = (todoListID: string, idStatus: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', todoListID, idStatus, status} as const
}
export const changeTaskTitleAC = (todoListID: string, idStatus: string, newTitle: string) => {
    return {type: 'CHANGE-TASK-TITLE', idStatus, todoListID, newTitle} as const
}

export const setTasksAC = (tasksApi: TaskApiType[], todoListIdApi: string) => ({
    type: "SET-TASKS", tasksApi, todoListIdApi}
) as const


//====Thunks====//

export const fetchTasksThunk = (todoListID: string) => (dispatch: Dispatch) => {
    taskAPI.getTasks(todoListID).then((res) => {
        const tasks = res.data.items
        dispatch(setTasksAC(tasks, todoListID))
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
            dispatch(addTaskAC(res.data.data.item, todoListID))
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

    taskAPI.updateTasks(todoListID, taskId, model)
        .then((res) => {
            dispatch(changeTaskStatusAC(todoListID, taskId, status))
        })
}


export const updateTaskTitleTC = (todoListID: string, taskId: string, newTitle: string) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todoListID].find((t) => t.id === taskId)

        if (task) {
            const res = await taskAPI.updateTaskTitle(todoListID, taskId, {
                title: newTitle,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline
            })
            dispatch(changeTaskTitleAC(todoListID, taskId, newTitle))
        }
    }