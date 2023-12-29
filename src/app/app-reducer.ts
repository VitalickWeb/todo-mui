import {Dispatch} from "redux";
import {authAPI} from "../API/todolist-api";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitial: false
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-LOGGED-IN':
            return {...state, isInitial: action.isInit}

        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setIsLoggedAC = (isInit: boolean) => ({type: 'APP/SET-IS-LOGGED-IN', isInit} as const)

export const initializeAppTC = () => async (dispatch: Dispatch) => {

    let res = await authAPI.me()

    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedAC(true));
    } else {
        dispatch(setIsLoggedAC(false))
    }
}

export type SetStatusAT = ReturnType<typeof setStatusAC>
export type SetErrorAT = ReturnType<typeof setErrorAC>
export type SetIsLoggedInAT = ReturnType<typeof setIsLoggedAC>

export type AppActionsType =
    | SetStatusAT
    | SetErrorAT
    | SetIsLoggedInAT
