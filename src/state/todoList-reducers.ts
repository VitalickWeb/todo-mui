import {todolistAPI, TodoType} from "../API/todolist-api";
import {Dispatch} from "redux";
import {TodolistType} from "../AppWithRedux";

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

const initialState: TodolistType[] = []

export type WordFilter = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodolistType & {
    filter: WordFilter
}

export const todoListReducers = (state: TodolistType[] = initialState, action: TodoListActionsType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)

        case "ADD-TODOLIST":
            const newTodolist: TodoListDomainType = {
                id: action.todoListID,
                title: action.title,
                filter: 'all',
            }
            return [...state, newTodolist]

        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)

        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)

        case "SET-TODO-LISTS": {
            return action.todoLists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }

        default:
            return state
    }
}
//функция action creator - это функция, которая принимает параметры, которые необходимы,
//чтобы сформировать правильный объект
export const removeTodoListAC = (todoListID: string) => (
    {type: "REMOVE-TODOLIST", todoListID}
) as const
export const addTodoListAC = (title: string, todoListID: string) => (
    {type: "ADD-TODOLIST", title, todoListID}
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


//====Thunks====//


export const fetchTodoListsThunk = () => (dispatch: Dispatch) => {
    todolistAPI.getTodoLists().then((res) => {
        dispatch(setTodoListsAC(res.data));
    })
}