import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from "./tasks-redusers";


let startState: TasksStateType

beforeEach( () => {
    startState = {
        "todolistId1": [
            {
                id: '1',
                title: "HTML",
                status: 1,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                todoListId: ''
            },
            {
                id: '2', title: "JS",
                description: '',
                todoListId: '',
                order: 0,
                status: 1,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '3', title: "React",
                description: '',
                todoListId: '',
                order: 0,
                status: 1,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ],
        "todolistId2": [
            {
                id: '1',
                title: "bread",
                status: 1,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                todoListId: ''
            },
            {
                id: '2', title: "milk",
                description: '',
                todoListId: '',
                order: 0,
                status: 1,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '3', title: "tea",
                description: '',
                todoListId: '',
                order: 0,
                status: 1,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("todolistId2", "2");
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", status: false},
            {id: "2", title: "JS", status: true},
            {id: "3", title: "React", status: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: false},
            {id: "3", title: "tea", status: false}
        ]
    });
});

test('correct task should be added to correct array', () => {
    const action = addTaskAC('car','todoListID1');

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juice');
    expect(endState["todolistId2"][0].status).toBe(false);
});

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('todolistId2', '3',0)
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][2].id).toBe('3')
    expect(endState['todolistId2'][2].title).toBe('tea')
    expect(endState['todolistId2'][2].status).toBe(false)
})

test('new title should be added', () => {
    const action = changeTaskTitleAC("1","todolistId2","Reducers");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][0].title).toBe("CSS");
    expect(endState["todolistId2"][0].title).toBe("Reducers");
});