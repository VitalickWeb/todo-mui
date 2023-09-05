import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from "./tasks-redusers";
import {TaskApiType, TaskPriorities, TaskStatuses} from "../API/todolist-api";
import {setTodoListsAC} from "./todoList-reducers";

let startState: TasksStateType

beforeEach( () => {
    startState = {
        "todoListId1": [
            { id: '1', title: "CSS", description: '', addedDate: '', deadline: '',
        status: TaskStatuses.new, order: 0, priority: TaskPriorities.low, startDate: '', todoListId: ''},
            { id: '2', title: "JS", description: '', todoListId: '', order: 0,
        status: TaskStatuses.completed, priority: TaskPriorities.low, startDate: '', deadline: '', addedDate: ''},
            { id: '3', title: "React", description: '', todoListId: '', order: 0,
        status: TaskStatuses.new, priority: TaskPriorities.low, startDate: '', deadline: '', addedDate: ''}
        ],
        "todoListId2": [
            { id: '1', title: "bread", description: '', addedDate: '', deadline: '',
        status: TaskStatuses.new, order: 0, priority: TaskPriorities.low, startDate: '', todoListId: ''},
            { id: '2', title: "milk", description: '', todoListId: '', order: 0,
        status: TaskStatuses.new, priority: TaskPriorities.low, startDate: '', deadline: '', addedDate: ''},
            { id: '3', title: "tea", description: '', todoListId: '', order: 0,
        status: TaskStatuses.completed, priority: TaskPriorities.low, startDate: '', deadline: '', addedDate: ''
            }
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("todoListId2", "2");
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todoListId1": [
            { id: '1', title: "CSS", description: '', addedDate: '', deadline: '',
        status: TaskStatuses.new, order: 0, priority: TaskPriorities.low, startDate: '', todoListId: ''},
            { id: '2', title: "JS", description: '', todoListId: '', order: 0,
        status: TaskStatuses.completed, priority: TaskPriorities.low, startDate: '', deadline: '', addedDate: ''},
            { id: '3', title: "React", description: '', todoListId: '', order: 0,
        status: TaskStatuses.new, priority: TaskPriorities.low, startDate: '', deadline: '', addedDate: ''}
        ],
        "todoListId2": [
            { id: '1', title: "bread", description: '', addedDate: '', deadline: '',
        status: TaskStatuses.new, order: 0, priority: TaskPriorities.low, startDate: '', todoListId: ''},
            { id: '3', title: "tea", description: '', todoListId: '', order: 0,
        status: TaskStatuses.completed, priority: TaskPriorities.low, startDate: '', deadline: '', addedDate: ''},
        ]
    });
});

test('correct task should be added to correct array', () => {
    let todoListId = 'todoListId2'

    let task: TaskApiType = {
        id: '4',
        title: "juice",
        status: TaskStatuses.new,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.low,
        startDate: '',
        todoListId: todoListId
    };

    const action = addTaskAC(task, todoListId);

    const endState = tasksReducer(startState, action)


    expect(endState['todoListId1'].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(4);
    expect(endState["todoListId2"][0].id).toBeDefined();
    expect(endState["todoListId2"][0].title).toBe('juice');
    expect(endState["todoListId2"][0].status).toBe(0);
});

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('todoListId1', '2',2)
    const endState = tasksReducer(startState, action)

    expect(endState['todoListId1'][1].id).toBe('2')
    expect(endState['todoListId1'][1].title).toBe('JS')
    expect(endState['todoListId1'][1].status).toBe(2)
})

test('new title should be added', () => {
    const action = changeTaskTitleAC("1","todoListId2","Reducers");
    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"][0].title).toBe("CSS");
    expect(endState["todoListId2"][0].title).toBe("Reducers");
});

test('empty arrays should be added when we set todoLists', () => {
    const action = setTodoListsAC([
        {id: '1', title: 'title 1', addedDate: '', order: 0},
        {id: '2', title: 'title 2', addedDate: '', order: 0}
    ]);
    const endState = tasksReducer({}, action)

    expect(endState['1']).toStrictEqual([]);
    expect(endState['2']).toStrictEqual([]);
});