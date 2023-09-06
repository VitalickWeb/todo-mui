import React from 'react';
// import './App.css';
// import {v1} from "uuid";
// import {TasksType, Todolist} from "./Components/Todolist";
// import {AddItemForm} from "./Components/AddItemForm";
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
// import {
//     addTodoListAC,
//     changeTodoListTitleAC,
//     filterTodoListAC,
//     removeTodoListAC,
//     TodoListReducer
// } from "./state/TodoList-reducer";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-redusers";
//
// export type WordFilter = 'all' | 'active' | 'completed'
//
// export type TodolistType = {
//     id: string
//     title: string
//     filter: WordFilter
// }
// export type TasksStateType = {
//     [todoListID: string]: Array<TasksType>
// }
//
// export function AppWithReducer() {
//     const todoListID1 = v1()
//     const todoListID2 = v1()
//
//     const [todoLists, dispatchToTodoLists] = useReducer(TodoListReducer, [
//         {id: todoListID1, title: 'what to learn', filter: 'all'},
//         {id: todoListID2, title: 'what to buy', filter: 'all'},
//     ])
//
//     const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
//         [todoListID1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true},
//             {id: v1(), title: "ReactJS", isDone: false},
//             {id: v1(), title: "Rest API", isDone: false},
//             {id: v1(), title: "GraphQL", isDone: false},
//         ],
//         [todoListID2]: [
//             {id: v1(), title: "Bread", isDone: true},
//             {id: v1(), title: "Milk", isDone: true},
//             {id: v1(), title: "String", isDone: false},
//             {id: v1(), title: "Bike", isDone: false},
//             {id: v1(), title: "Guitar", isDone: false},
//         ],
//     })
//
//     const removeTask = (todoListID: string, taskId: string) => {
//         // setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskId)})
//         // let remove = tasks.filter(del => del.id !== taskId)
//         // setTasks(remove)
//         dispatchToTasks(removeTaskAC(todoListID, taskId))
//     }
//     const addTask = (todoListID: string, title: string) => {
//         //debugger
//         // let newTask = {id: v1(), title, isDone: false}
//         // setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
//
//         // let newTask = {
//         //     id: v1(),
//         //     title: title,
//         //     isDone: false,
//         // }
//         // setTasks([newTask, ...tasks])
//         dispatchToTasks(addTaskAC(title, todoListID))
//     }
//     const changeStatus = (todoListID: string, idStatus: string, isDone: boolean) => {
//         // setTasks({
//         //     ...tasks,
//         //     [todoListID]: tasks[todoListID].map(tl => tl.id === idStatus ? {...tl, isDone: isDone} : tl)
//         // })
//         // let newTask = tasks.map(t => t.id === idStatus ? {...t, isDone: isDone} : t)
//         // setTasks(newTask)
//         dispatchToTasks(changeTaskStatusAC(todoListID, idStatus, isDone))
//     }
//     const changeTaskTitle = (todoListID: string, idStatus: string, title: string) => {
//         // setTasks({...tasks, [todoListID]: tasks[todoListID].map(tl => tl.id === idStatus ? {...tl, title: title} : tl)})
//         dispatchToTasks(changeTaskTitleAC(idStatus, todoListID, title))
//     }
//
//     const removeTodo = (todoListID: string) => {
//         //setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
//         //delete tasks.todoListID
//         dispatchToTodoLists(removeTodoListAC(todoListID))
//     }
//     const changeTodolistTitle = (todoListID: string, title: string) => {
//         // setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl))
//         // setFilter(filter)
//         dispatchToTodoLists(changeTodoListTitleAC(title, todoListID))
//     }
//
//     const addTodolist = (title: string) => {
//         // const newTodolistID = v1()
//         // const newTodolist: TodolistType = {
//         //     id: newTodolistID,
//         //     title: title,
//         //     filter: 'all',
//         // }
//         // setTodoLists([...todoLists, newTodolist])
//         // setTasks({...tasks, [newTodolistID]: []})
//         let id = v1()
//         dispatchToTodoLists(addTodoListAC(title, id))
//         dispatchToTasks(addTodoListAC(title, id))
//     }
//
//     const filterTasks = (todoListID: string, filter: WordFilter) => {
//         //setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
//         // setFilter(filter)
//         dispatchToTodoLists(filterTodoListAC(todoListID, filter))
//     }
//
//     //UI:
//     const todoListsComponents = todoLists.map((tl: TodolistType) => {
//         let filteredTasks: Array<TasksType> = tasks[tl.id];
//         if (tl.filter === 'active') {
//             filteredTasks = tasks[tl.id].filter(f => !f.isDone)
//         } else if (tl.filter === 'completed') {
//             filteredTasks = tasks[tl.id].filter(f => f.isDone)
//         }
//
//         return (
//             <Grid item key={tl.id}>
//                 <Paper style={{padding: '20px'}} elevation={8}>
//                     <Todolist
//                         todoListID={tl.id}
//                         title={tl.title}
//                         tasks={filteredTasks}
//                         filter={tl.filter}
//
//                         removeTask={removeTask}
//                         addTask={addTask}
//                         filterTasks={filterTasks}
//                         changeStatus={changeStatus}
//                         changeTaskTitle={changeTaskTitle}
//                         changeTodolistTitle={changeTodolistTitle}
//                         removeTodo={removeTodo}
//                     />
//                 </Paper>
//             </Grid>
//         )
//     })
//
//     return (
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar style={{justifyContent: "space-between"}}>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6">
//                         TodoLists
//                     </Typography>
//                     <Button color="inherit" variant={"outlined"}>Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed style={{padding: "20px 0"}}>
//                 <Grid container>
//                     <AddItemForm
//                         addItem={addTodolist}
//                     />
//                 </Grid>
//                 <Grid container spacing={5}>
//                     {todoListsComponents}
//                 </Grid>
//             </Container>
//         </div>
//     );
// }



