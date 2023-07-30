
import {TodolistType, WordFilter} from "../AppWithRedux";

export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type ChangeTodoListAT = ReturnType<typeof changeTodoListTitleAC>
export type FilterTodoListAT = ReturnType<typeof filterTodoListAC>

export type ActionType = RemoveTodoListAT | AddTodoListAT | FilterTodoListAT | ChangeTodoListAT

const initialState: Array<TodolistType> = []

export const todoListReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)

        case "ADD-TODOLIST":
            const newTodolist: TodolistType = {
                id: action.todoListID,
                title: action.title,
                filter: 'all',
            }
            return [...state, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}
//функция action creator - это функция, которая принимает параметры, которые необходимы,
//чтобы сформировать правильный объект
export const removeTodoListAC = (todoListID: string) => ({type: "REMOVE-TODOLIST", todoListID}) as const
export const addTodoListAC = (title: string, todoListID: string) => ({type: "ADD-TODOLIST", title, todoListID}) as const
export const changeTodoListTitleAC = (title: string, todoListID: string) => ({type: "CHANGE-TODOLIST-TITLE", title, todoListID}) as const
export const filterTodoListAC = (todoListID: string, filter: WordFilter) => ({type: "CHANGE-TODOLIST-FILTER", todoListID, filter}) as const



