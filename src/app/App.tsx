import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "../Components/TodoList/Todolist";
import {AddItemForm} from "../Components/AddItemForm/AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    createTodListTC,
    deleteTodListTC,
    fetchTodoListsThunk,
    filterTodoListAC,
    TodoListDomainType,
    updateTodListTitleTC,
    WordFilter,
} from "../state/todoList-reducers";
import {
    createTaskTC,
    deleteTaskTC,
    TasksStateType,
    updateTaskStatusTC,
    updateTaskTitleTC
} from "../state/tasks-redusers";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../state/store";
import {TaskApiType} from "../API/todolist-api";



export function App() {
    // const todoListID1 = v1()
    // const todoListID2 = v1()
    //
    // const [todoLists, dispatchToTodoLists] = useReducer(todoListReducers, [
    //     {id: todoListID1, title: 'what to learn', filter: 'all'},
    //     {id: todoListID2, title: 'what to buy', filter: 'all'},
    // ])
    //
    // const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    //     [todoListID1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    //     [todoListID2]: [
    //         {id: v1(), title: "Bread", isDone: true},
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "String", isDone: false},
    //         {id: v1(), title: "Bike", isDone: false},
    //         {id: v1(), title: "Guitar", isDone: false},
    //     ],
    // })

    return (
        <>
            <div className="App">
                <AppBar position="static">
                    <Toolbar style={{justifyContent: "space-between"}}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            Todo-Lists
                        </Typography>
                        <Button color="inherit" variant={"outlined"}>Login</Button>
                    </Toolbar>
                </AppBar>
                <LinearProgress color="secondary" />
                <Container fixed style={{padding: "20px 0"}}>
                    <TodoListsList />
                </Container>
            </div>
        </>
    );
}

export type TodolistType = {
    id: string
    title: string
    filter: WordFilter
    addedDate: string
    order: number
}
export type TodoListsListPropsType = {
}

const TodoListsList: React.FC<TodoListsListPropsType> = () => {

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