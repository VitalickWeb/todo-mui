import {v1} from "uuid"
import {ChangeTodoListAT, FilterTodoListAT, todoListReducers, WordFilter} from "./todoList-reducers";
import {TodolistType} from "../AppWithRedux";

let todoListID1: string
let todoListID2: string
let startState: Array<TodolistType>

beforeEach( () => {
    todoListID1 = v1()
    todoListID2 = v1()

    startState = <Array<TodolistType>>[
        {id: todoListID1, title: 'what to learn', filter: 'all'},
        {id: todoListID2, title: 'what to buy', filter: 'all'},
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
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListReducers(startState,  {type: "ADD-TODOLIST", title: newTodolistTitle, todoListID: todoListID1})

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: WordFilter = "completed";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
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
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
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
