import {
    createTodListTC,
    deleteTodListTC,
    fetchTodoListsThunk, filterTodoListAC,
    updateTodListTitleTC,
    WordFilter
} from "./todoList-reducers";
import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {
    createTaskTC,
    deleteTaskTC,
    TasksStateType,
    updateTaskStatusTC,
    updateTaskTitleTC
} from "./tasks-redusers";
import {TaskApiType} from "../../API/todolist-api";
import {Grid, Paper} from "@material-ui/core";
import {Todolist} from "./TodoList/Todolist";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";

export type TodolistType = {
    id: string
    title: string
    filter: WordFilter
    addedDate: string
    order: number
}
export type TodoListsListPropsType = {
}

export const TodoListsList: React.FC<TodoListsListPropsType> = () => {

    const todoLists = useSelector<AppRootStateType, TodolistType[]>( state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>( state => state.tasks)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodoListsThunk());
    }, [])

    const removeTask = useCallback((todoListID: string, taskId: string) => {
        // setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskId)})
        // let remove = tasks.filter(del => del.id !== taskId)
        // setTasks(remove)
        dispatch(deleteTaskTC(todoListID, taskId))
    }, [dispatch])

    const addTask = useCallback(( title: string, todoListID: string) => {
        // let newTask = {id: v1(), title, isDone: false}
        // setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
        // setTasks([newTask, ...tasks])
        dispatch(createTaskTC(title, todoListID))
    }, [dispatch])

    const changeStatus = useCallback((todoListID: string, idStatus: string, status: number) => {
        // setTasks({
        //     ...tasks,
        //     [todoListID]: tasks[todoListID].map(tl => tl.id === idStatus ? {...tl, isDone: isDone} : tl)
        // })
        // let newTask = tasks.map(t => t.id === idStatus ? {...t, isDone: isDone} : t)
        // setTasks(newTask)
        dispatch(updateTaskStatusTC(todoListID, idStatus, status))
    }, [dispatch])

    const changeTaskTitle = useCallback((todoListID: string, idStatus: string, newTitle: string) => {
        // setTasks({...tasks, [todoListID]: tasks[todoListID].map(tl => tl.id === idStatus ? {...tl, title: title} : tl)})
        dispatch(updateTaskTitleTC(todoListID, idStatus, newTitle))
    }, [dispatch])

    const removeTodo = useCallback((todoListID: string) => {
        //setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        //delete tasks.todoListID
        dispatch(deleteTodListTC(todoListID))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todoListID: string, title: string) => {
        // setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl))
        // setFilter(filter)
        dispatch(updateTodListTitleTC(title, todoListID))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        // const newTodolistID = v1()
        // const newTodolist: TodolistType = {
        //     id: newTodolistID,
        //     title: title,
        //     filter: 'all',
        // }
        // setTodoLists([...todoLists, newTodolist])
        // setTasks({...tasks, [newTodolistID]: []})
        //let id = v1()
        dispatch(createTodListTC(title))
    }, [dispatch])

    const filterTasks = useCallback((todoListID: string, filter: WordFilter) => {
        //setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
        // setFilter(filter)
        dispatch(filterTodoListAC(todoListID, filter))
    }, [dispatch])

    //UI:
    const todoListsComponents = todoLists.map((tl: TodolistType) => {
        let filteredTasks: Array<TaskApiType> = tasks[tl.id];

        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: '20px'}} elevation={8}>
                    <Todolist
                        todoListID={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={filteredTasks}

                        removeTask={removeTask}
                        addTask={addTask}
                        filterTasks={filterTasks}
                        changeStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                        removeTodo={removeTodo}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <>
            <Grid container>
                <AddItemForm
                    addItem={addTodolist}
                />
            </Grid>
            <Grid container spacing={5}>
                {todoListsComponents}
            </Grid>
        </>
    )
}