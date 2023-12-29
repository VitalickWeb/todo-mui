import {
    createTodListTC,
    deleteTodListTC,
    fetchTodoListsThunk,
    filterTodoListAC,
    updateTodoListTitleTC,
    WordFilter
} from "./todoList-reducers";
import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {
    createTaskTC,
    deleteTaskTC,
    TaskDomainType,
    TasksStateType,
    updateTaskStatusTC,
    updateTaskTitleTC
} from "./tasks-redusers";
import {Grid, Paper} from "@material-ui/core";
import {Todolist} from "./TodoList/Todolist";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {RequestStatusType} from "../../app/app-reducer";
import {Navigate} from "react-router-dom";

export type TodolistType = {
    id: string
    title: string
    filter: WordFilter
    addedDate: string
    order: number
    entityStatus: RequestStatusType;
}
export type TodoListsListPropsType = {
}

export const TodoListsList: React.FC<TodoListsListPropsType> = () => {

    const todoLists = useSelector<AppRootStateType, TodolistType[]>( state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>( state => state.tasks)
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLogged) {
            return;
        }
        dispatch(fetchTodoListsThunk());
    }, [])

    const removeTask = useCallback(async (todoListID: string, taskId: string) => {
        // setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskId)})
        // let remove = tasks.filter(del => del.id !== taskId)
        // setTasks(remove)
        await dispatch(deleteTaskTC(todoListID, taskId))
    }, [dispatch])

    const addTask = useCallback(async ( title: string, todoListID: string) => {
        // let newTask = {id: v1(), title, isDone: false}
        // setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
        // setTasks([newTask, ...tasks])
        await dispatch(createTaskTC(title, todoListID))
    }, [dispatch])

    const changeStatus = useCallback(async(todoListID: string, idStatus: string, status: number) => {
        // setTasks({
        //     ...tasks,
        //     [todoListID]: tasks[todoListID].map(tl => tl.id === idStatus ? {...tl, isDone: isDone} : tl)
        // })
        // let newTask = tasks.map(t => t.id === idStatus ? {...t, isDone: isDone} : t)
        // setTasks(newTask)
        await dispatch(updateTaskStatusTC(todoListID, idStatus, status))
    }, [dispatch])

    const changeTaskTitle = useCallback(async (todoListID: string, idStatus: string, newTitle: string) => {
        // setTasks({...tasks, [todoListID]: tasks[todoListID].map(tl => tl.id === idStatus ? {...tl, title: title} : tl)})
        await dispatch(updateTaskTitleTC(todoListID, idStatus, newTitle))
    }, [dispatch])

    const removeTodo = useCallback(async (todoListID: string) => {
        //setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        //delete tasks.todoListID
        await dispatch(deleteTodListTC(todoListID))
    }, [dispatch])

    const changeTodolistTitle = useCallback(async (todoListID: string, title: string) => {
        // setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl))
        // setFilter(filter)
        await dispatch(updateTodoListTitleTC(title, todoListID))
    }, [dispatch])

    const addTodolist = useCallback(async (title: string) => {
        // const newTodolistID = v1()
        // const newTodolist: TodolistType = {
        //     id: newTodolistID,
        //     title: title,
        //     filter: 'all',
        // }
        // setTodoLists([...todoLists, newTodolist])
        // setTasks({...tasks, [newTodolistID]: []})
        //let id = v1()
        await dispatch(createTodListTC(title))
    }, [dispatch])

    const filterTasks = useCallback((todoListID: string, filter: WordFilter) => {
        //setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
        // setFilter(filter)
        dispatch(filterTodoListAC(todoListID, filter))
    }, [dispatch])

    //UI:
    const todoListsComponents = todoLists.map((tl: TodolistType) => {
        let filteredTasks: Array<TaskDomainType> = tasks[tl.id];

        if (!isLogged) {
            return <Navigate to={'/login'}/>
        }

        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: '20px'}} elevation={8}>
                    <Todolist
                        todoListID={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        entityStatus={tl.entityStatus}

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