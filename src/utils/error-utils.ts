import {setErrorAC, SetErrorAT, setStatusAC, SetStatusAT} from '../app/app-reducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../API/todolist-api'

// generic function
//типизация generic function, когда нужно взять какой то <T> то принимает он его перед скобками параметров
//функции.
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (error: string, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setErrorAC(error))
    dispatch(setStatusAC('failed'))
}

export type ErrorUtilsDispatchType = Dispatch<SetErrorAT | SetStatusAT>