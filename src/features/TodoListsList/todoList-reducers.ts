import {ResultCode, todolistAPI, TodoType} from "../../API/todolist-api";
import {AnyAction, Dispatch} from "redux";
import {TodolistType} from "./TodoListsList";
import {RequestStatusType, SetErrorAT, setStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios from "axios";
import {ErrorType, fetchTasksThunk} from "./tasks-redusers";
import {AppRootStateType, AppThunk, ForAllAppActionsType} from "../../app/store";
import {ThunkAction} from "redux-thunk";

const initialState: TodolistType[] = []
// const todoListID1 = v1()
// const todoListID2 = v1()
//
// const [todoLists, dispatchToTodoLists] = useReducer(todoListReducers, [
//     {id: todoListID1, title: 'what to learn', filter: 'all'},
//     {id: todoListID2, title: 'what to buy', filter: 'all'},
// ])
//
// const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
//     [todoListID1]: [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "ReactJS", isDone: false},
//         {id: v1(), title: "Rest API", isDone: false},
//         {id: v1(), title: "GraphQL", isDone: false},
//     ],
//     [todoListID2]: [
//         {id: v1(), title: "Bread", isDone: true},
//         {id: v1(), title: "Milk", isDone: true},
//         {id: v1(), title: "String", isDone: false},
//         {id: v1(), title: "Bike", isDone: false},
//         {id: v1(), title: "Guitar", isDone: false},
//     ],
// })
export const todoListReducers = (state: TodolistType[] = initialState, action: TodoListActionsType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodoList: TodoListDomainType = {...action.todoListID, filter: 'all', entityStatus: 'idle'}
            return [newTodoList, ...state]

        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        case "SET-TODO-LISTS":
            return action.todoLists.map((tl: TodoType) => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case "CHANGE-TODO-LISTS-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)

        default:
            return state
    }
}
// Actions
//функция action creator - это функция, которая принимает параметры, которые необходимы,
//чтобы сформировать правильный объект
export const removeTodoListAC = (todoListID: string) => (
    {type: "REMOVE-TODOLIST", todoListID}
) as const
export const addTodoListAC = (todoListID: TodoType) => (
    {type: "ADD-TODOLIST", todoListID}
) as const
export const changeTodoListTitleAC = (title: string, todoListID: string) => (
    {type: "CHANGE-TODOLIST-TITLE", title, todoListID}
) as const
export const filterTodoListAC = (todoListID: string, filter: WordFilter) => (
    {type: "CHANGE-TODOLIST-FILTER", todoListID, filter}
) as const
export const setTodoListsAC = (todoLists: TodoType[]) => (
    {type: "SET-TODO-LISTS", todoLists}
) as const
export const changeTodoListEntityStatusAC = (id: string, status: RequestStatusType) => (
    {type: "CHANGE-TODO-LISTS-ENTITY-STATUS", id, status}
) as const

// Thunks
export const fetchTodoListsThunk = (): AppThunk =>
    async dispatch => {
    dispatch(setStatusAC('loading'))

    try {
        const res = await todolistAPI.getTodoLists()
        dispatch(setTodoListsAC(res.data));
        dispatch(setStatusAC('succeeded'))

        const todos = res.data

        todos.forEach( (tl) => {
            dispatch(fetchTasksThunk(tl.id))
        })
        return todos
    }
    catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ? e.response.data.messages[0].message : e.message
            handleServerNetworkError(error, dispatch)
            return;
        }
        const error = (e as Error).message
        handleServerNetworkError(error, dispatch)
    }
}
export const deleteTodListTC = (todoListID: string): AppThunk => async dispatch => {
    dispatch(setStatusAC('loading'))
    dispatch(changeTodoListEntityStatusAC(todoListID, 'loading'))

    try {

        const res = await todolistAPI.deleteTodoLists(todoListID)

        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(removeTodoListAC(todoListID));
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }

    }
    catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ? e.response.data.messages[0].message : e.message
            handleServerNetworkError(error, dispatch)
            return;
        }
        const error = (e as Error).message
        handleServerNetworkError(error, dispatch)
    }
}
export const createTodListTC = (title: string): AppThunk => async dispatch => {
    dispatch(setStatusAC('loading'))

    try {

        const res = await todolistAPI.createTodoLists(title)

        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(addTodoListAC(res.data.data.item));
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }

    }
    catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ? e.response.data.messages[0].message : e.message
            handleServerNetworkError(error, dispatch)
            return;
        }
        const error = (e as Error).message
        handleServerNetworkError(error, dispatch)
    }
}
export const updateTodoListTitleTC = (title: string, todoListID: string): AppThunk => async dispatch => {
    dispatch(setStatusAC('loading'))
    dispatch(changeTodoListEntityStatusAC(todoListID, 'loading'))

    try {

        const res = await todolistAPI.updateTodoLists(todoListID, title)

        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(changeTodoListTitleAC(title, todoListID));
            dispatch(setStatusAC('succeeded'))
            dispatch(changeTodoListEntityStatusAC(todoListID, 'succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }

    }
    catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ? e.response.data.messages[0].message : e.message
            handleServerNetworkError(error, dispatch)
            return;
        }
        const error = (e as Error).message
        handleServerNetworkError(error, dispatch)
    }
}

// Types
export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type ChangeTodoListAT = ReturnType<typeof changeTodoListTitleAC>
export type FilterTodoListAT = ReturnType<typeof filterTodoListAC>
export type SetTodoListsAT = ReturnType<typeof setTodoListsAC>
export type ChangeTodoListEntityStatusAT = ReturnType<typeof changeTodoListEntityStatusAC>

export type TodoListActionsType =
    | RemoveTodoListAT
    | AddTodoListAT
    | FilterTodoListAT
    | ChangeTodoListAT
    | SetTodoListsAT
    | ChangeTodoListEntityStatusAT
    | SetErrorAT

export type WordFilter = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodolistType & {
    filter: WordFilter
    entityStatus: RequestStatusType
}

