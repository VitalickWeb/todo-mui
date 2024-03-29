//Помним главное правило: все что мы видим на экране зависит от state,
// ничего на экране не может измениться пока не изменились данные.

import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";

import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {TaskActionsType, tasksReducer} from "../features/TodoListsList/tasks-redusers";
import {TodoListActionsType, todoListReducers} from "../features/TodoListsList/todoList-reducers";
import {AppActionsType, appReducer} from "./app-reducer";
import {AuthActionsType, authReducer} from "../features/login/auth-reducer";

// Поэтому, первым шагом, создадим еще один редьюсер для обработки состояния каких-то аспектов,
// касающихся всего приложения, таких как: выбранный язык интерфейса, загружаются ли данные
// или нет, кто именно сейчас залогинен в систему…
//В appReducer хранятся различные состояния по приложению
export const rootReducer = combineReducers({
    app: appReducer,
    tasks: tasksReducer,
    todoLists: todoListReducers,
    auth: authReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()

//все типы actions для всего app
export type ForAllAppActionsType = TodoListActionsType | TaskActionsType | AppActionsType | AuthActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ForAllAppActionsType>

// @ts-ignore
window.store = store



//после работы функции legacy_createStore(rootReducer) родится следующий store
// {
//     state: {
//         tasks: {}
//         todoLists: []
//     }
//     getState()
//     dispatch()
//     subscribe()
// }