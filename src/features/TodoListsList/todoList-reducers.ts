import {ResultCode, todolistAPI, TodoType} from "../../API/todolist-api";
import {Dispatch} from "redux";
import {TodolistType} from "./TodoListsList";
import {setErrorAC, setStatusAC} from "../../app/app-reducer";

const initialState: TodolistType[] = []

export const todoListReducers = (state: TodolistType[] = initialState, action: TodoListActionsType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodoList: TodoListDomainType = {...action.todoListID, filter: 'all'}
            return [newTodoList, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        case "SET-TODO-LISTS": {
            return action.todoLists.map(tl => ({...tl, filter: 'all'}))
        }
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

// Thunks
export const fetchTodoListsThunk = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.getTodoLists().then((res) => {
        dispatch(setTodoListsAC(res.data));
        dispatch(setStatusAC('succeeded'))
    })
}
export const deleteTodListTC = (todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.deleteTodoLists(todoListID).then((res) => {
        dispatch(removeTodoListAC(todoListID));
        dispatch(setStatusAC('succeeded'))
    })
}
export const createTodListTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.createTodoLists(title).then((res) => {
        if (res.data.resultCode === ResultCode.success) {
            dispatch(addTodoListAC(res.data.data.item));
            dispatch(setStatusAC('succeeded'))
        } else {
            res.data.messages.length
                ? dispatch(setErrorAC(res.data.messages[0]))
                : dispatch(setErrorAC('Some error occurred!'))

            dispatch(setStatusAC('failed'))
        }

    })
}
export const updateTodListTitleTC = (title: string, todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.updateTodoLists(todoListID, title).then((res) => {
        dispatch(changeTodoListTitleAC(title, todoListID));
        dispatch(setStatusAC('succeeded'))
    })
}

// Types
export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type ChangeTodoListAT = ReturnType<typeof changeTodoListTitleAC>
export type FilterTodoListAT = ReturnType<typeof filterTodoListAC>
export type setTodoListsAT = ReturnType<typeof setTodoListsAC>

export type TodoListActionsType =
    | RemoveTodoListAT
    | AddTodoListAT
    | FilterTodoListAT
    | ChangeTodoListAT
    | setTodoListsAT
export type WordFilter = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodolistType & {
    filter: WordFilter
}