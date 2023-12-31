import React, {useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodoListsList} from "../features/TodoListsList/TodoListsList";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../Components/ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/login/Login";


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

    const status = useSelector<AppRootStateType, RequestStatusType>( (state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>( (state) => state.app.isInitial)

    const dispatch = useAppDispatch()

    useEffect( () => {
        dispatch(initializeAppTC())
    })

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

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

                {status === 'loading' && <LinearProgress color="secondary"/>}

                <Container fixed style={{padding: "20px 0"}}>

                    <Routes>
                        <Route path = '/' element = {<TodoListsList />}/>
                        <Route path = '/Login' element = {<Login/>}/>

                        <Route path = '/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path='*' element={<Navigate to='/404'/>} />
                    </Routes>

                </Container>
                <ErrorSnackbar />
            </div>
        </>
    );
}

