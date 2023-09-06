import {v1} from "uuid"
import {ChangeTodoListAT, FilterTodoListAT, setTodoListsAC, todoListReducers, WordFilter} from "../state/todoList-reducers";
import {TodolistType} from "../app/App";
import {TodoType} from "../API/todolist-api";

let todoListID1: string
let todoListID2: string
let startState: TodolistType[]
let state: Array<TodoType>
let action: TodoType

beforeEach( () => {
    todoListID1 = v1()
    todoListID2 = v1()

    startState = <Array<TodolistType>>[
        {id: todoListID1, title: 'what to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListID2, title: 'what to buy', filter: 'all', addedDate: '', order: 0},
    ]

    state = <Array<TodoType>>[
        {id: todoListID1, title: 'what to learn', addedDate: '', order: 0},
        {id: todoListID2, title: 'what to buy', addedDate: '', order: 1},
    ]
})

test('correct todoList should be removed', () => {
    const endState = todoListReducers(startState, {type: "REMOVE-TODOLIST", todoListID: todoListID2})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID1)
})

test('todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]

    const endState = todoListReducers(startState, {todoListID: action, type: "ADD-TODOLIST"})
    console.log(endState[0].title === newTodolistTitle)
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: WordFilter = "completed";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]

    const action: FilterTodoListAT = {
        type: "CHANGE-TODOLIST-FILTER",
        todoListID: todolistId2,
        filter: newFilter
    }

    const endState = todoListReducers(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]

    const action: ChangeTodoListAT = {
        type: "CHANGE-TODOLIST-TITLE",
        todoListID: todolistId2,
        title: newTodolistTitle
    };

    const endState = todoListReducers(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('todo lists should be set to the state', () => {
    let action = setTodoListsAC(state)

    const endState = todoListReducers([], action);

    expect(endState.length).toBe(2);
});