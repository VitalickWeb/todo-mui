import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";

import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {tasksReducer} from "./tasks-redusers";
import {todoListReducers} from "./todoList-reducers";
import {appReducer} from "./app-reducer";

//В appReducer хранятся различные состояния по приложению
export const rootReducer = combineReducers({
    //app: appReducer,
    tasks: tasksReducer,
    todoLists: todoListReducers,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()


//export const AppActionsType = TodoListActionsType | TaskActionsType

export type AppRootStateType = ReturnType<typeof rootReducer>

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