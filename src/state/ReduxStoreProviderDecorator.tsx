import {Provider} from "react-redux";
import {AppRootStateType, rootReducer} from "./store";
import React from "react";
import {v1} from "uuid";
import {legacy_createStore} from "redux";

const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: 2,
                description: 'string',
                todoListId: 'string',
                order: 0,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                addedDate: 'string'
            },
            {
                id: v1(),
                title: "JS",
                status: 0,
                description: 'string',
                todoListId: 'string',
                order: 0,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                addedDate: 'string'
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk",
                status: 0,
                description: 'string',
                todoListId: 'string',
                order: 0,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                addedDate: 'string'
            },
            {
                id: v1(),
                title: "React Book",
                status: 2,
                description: 'string',
                todoListId: 'string',
                order: 0,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                addedDate: 'string'
            }
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}