import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../API/todolist-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,//flag который проверяет на наличие cookie
    // headers: {
    //     'API-KEY': 'd26e77b0-fffd-47c6-b626-b4aa9e3fa7eb'
    // }
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodoLists()
            .then((res) => {
                setState(res.data);
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.createTodoLists(`/todo-lists${'Create NEW TODO LIST'}`)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todoListId = 'fac25d6d-ff3e-46d0-8f81-63b6cc0bd8d4'

        todolistAPI.deleteTodoLists(`/todo-lists${todoListId}`)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todoListId = '23d1b61b-cfb6-49a8-b7e5-1671e051ee7c'
        let title = 'Create NEW TODO LIST'

        todolistAPI.updateTodoLists(`/todo-lists${todoListId}`, title)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}