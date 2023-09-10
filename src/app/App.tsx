import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodoListsList} from "../features/TodoListsList/TodoListsList";


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

