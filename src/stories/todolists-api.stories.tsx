import React, {useEffect, useState} from 'react'
import {taskAPI, todolistAPI} from "../API/todolist-api";

export default {
    title: 'API'
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

        todolistAPI.createTodoLists('Create NEW TODO LIST')
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todoListId = '4fda3a7d-2e17-413c-8327-a3fb11452ba9'

        todolistAPI.deleteTodoLists(todoListId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todoListId = '2a3ecba2-d8db-49f7-8c70-0321bd816c86'
        let title = 'Update NEW TITLE 222'

        todolistAPI.updateTodoLists(todoListId, title)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}


//================================= Tasks =================================
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todoListId = 'ecf92123-798f-4da8-830e-25f494aa4ad8'

        taskAPI.getTasks(todoListId)
            .then((res) => {
                setState(res.data);
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todoListId = 'ecf92123-798f-4da8-830e-25f494aa4ad8'

        taskAPI.createTasks(todoListId,'new title of task')
            .then((res) => {
                setState(res.data);
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todoListId = 'ecf92123-798f-4da8-830e-25f494aa4ad8'
        const taskId = '92a56203-feab-4549-8a1d-78d259a7961a'

        taskAPI.deleteTasks(todoListId, taskId)
            .then((res) => {
                setState(res.data);
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todoListId = 'ecf92123-798f-4da8-830e-25f494aa4ad8'
        const taskId = 'b2bd7b56-cf41-411f-adf9-fe0438c9aeaf'

        taskAPI.updateTasks(todoListId, taskId, {
            title: 'NEW UPDATE TITLE',
            description: '',
            status: 0,
            priority: 0,
            startDate: '',
            deadline: ''
        })
            .then((res) => {
                setState(res.data);
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}