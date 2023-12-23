import {Dispatch} from 'redux'
import {SetErrorAT, setStatusAC, SetStatusAT} from '../../app/app-reducer'
import {authAPI, LoginParamsType, ResultCode, TaskApiType} from "../../API/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios from "axios";
import {ErrorType} from "../TodoListsList/tasks-redusers";

const initialState = {
    isLoggedIn: false
}

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) =>
    async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))

    try {
        const res = await authAPI.login(data)

        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(setIsLoggedInAC(res.data))
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

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetStatusAT | SetErrorAT


