import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-redusers";
import {TasksStateType} from "../AppWithRedux";

let startState: TasksStateType

beforeEach( () => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("todolistId2", "2");
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    });
});

test('correct task should be added to correct array', () => {
    const action = addTaskAC("juice", "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juice');
    expect(endState["todolistId2"][0].isDone).toBe(false);
});

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('todolistId2', '3',false)
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][2].id).toBe('3')
    expect(endState['todolistId2'][2].title).toBe('tea')
    expect(endState['todolistId2'][2].isDone).toBe(false)
})

test('new title should be added', () => {
    const action = changeTaskTitleAC("1","todolistId2","Reducers");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][0].title).toBe("CSS");
    expect(endState["todolistId2"][0].title).toBe("Reducers");
});