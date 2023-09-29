import {v1} from "uuid"
import {
    ChangeTodoListAT,
    FilterTodoListAT,
    setTodoListsAC,
    todoListReducers,
    WordFilter
} from "../features/TodoListsList/todoList-reducers";
import {TodolistType} from "../features/TodoListsList/TodoListsList";
import {TodoType} from "../API/todolist-api";
import {RequestStatusType} from "../app/app-reducer";

let todoListID1: string
let todoListID2: string
let todoListID3: string

let startState: TodolistType[]
let todoList: TodoType
let RequestStatus: RequestStatusType

beforeEach( () => {
    todoListID1 = v1()
    todoListID2 = v1()
    todoListID3 = v1()

    startState = <Array<TodolistType>>[
        {id: todoListID1, title: 'what to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todoListID2, title: 'what to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    ]

})

test('correct todoList should be removed', () => {
    const endState = todoListReducers(startState, {type: "REMOVE-TODOLIST", todoListID: todoListID2})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID1)
})

test('todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    let start: TodolistType[] = [...startState,
        {
            id: todoListID3,
            title: newTodolistTitle,
            filter: 'all',
            addedDate: '',
            order: 0,
            entityStatus: RequestStatus
        }
    ]

    const endState = todoListReducers(start, {type: "ADD-TODOLIST", todoListID: todoList});

    console.log(endState);
    expect(endState.length).toBe(4);
    expect(endState[3].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: WordFilter = "completed";

    const startState: Array<TodolistType> = [
        {
            id: todolistId1, title: "What to learn",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: RequestStatus
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: RequestStatus}
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
        {
            id: todolistId1,
            title: "What to learn",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: RequestStatus
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: RequestStatus
        }
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
    let action = setTodoListsAC(startState)

    const endState = todoListReducers([], action);

    expect(endState.length).toBe(2);
});