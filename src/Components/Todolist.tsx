import React, {useCallback} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, List, PropTypes} from "@material-ui/core";
import {WordFilter} from "../AppWithRedux";
import {Task} from "./Task";



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksPropsType = {
    todoListID: string
    title: string
    tasks: TaskType[]
    removeTask: (todoListID: string, taskId: string) => void
    removeTodo: (todoListID: string) => void
    addTask: (todoListID: string, title: string) => void
    filterTasks: (todoListID: string, filter: WordFilter) => void
    changeStatus: (todoListID: string, idStatus: string, isDone: boolean) => void
    changeTaskTitle: (todoListID: string, idStatus: string, title: string) => void
    changeTodolistTitle: (todoListID: string, title: string) => void
    filter: string
}

export const Todolist = React.memo(({
    todoListID, title, tasks,
    removeTask, removeTodo, addTask,
    filterTasks, changeStatus,
    changeTodolistTitle, changeTaskTitle, filter,
}: TasksPropsType) => {
console.log('todolist')
    let filteredTasks: TaskType[] = tasks;

    if (filter === 'active') {
        filteredTasks = tasks.filter((f: { isDone: boolean }) => !f.isDone)
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter((f: { isDone: boolean }) => f.isDone)
    }

    const tasksRender = tasks.length ? filteredTasks.map(t => {

            return (
                <li key={t.id} className={t.isDone ? 'active-checked' : ''}>
                    <Task
                        task={t}
                        todoListID={todoListID}
                        removeTask={removeTask}
                        changeStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                    />
                </li>
            )
        })
        : <span>Your tasks is empty</span>

    const clickFilterAllHandler = useCallback(() => filterTasks(todoListID, 'all'), [filterTasks, todoListID])
    const clickFilterActiveHandler = useCallback(() => filterTasks(todoListID, 'active'), [filterTasks, todoListID])
    const clickFilterCompletedHandler = useCallback(() => filterTasks(todoListID, 'completed'), [filterTasks, todoListID])

    const removeTodoListHandler = useCallback(() => {
        removeTodo(todoListID)
    }, [removeTodo, todoListID])

    const addTaskHandler = useCallback((title: string) => {
        addTask(todoListID, title)
    }, [addTask, todoListID])

    const changeTodoTitleHandler = useCallback((newTitle: string) => {
        changeTodolistTitle(todoListID, newTitle)
    }, [changeTodolistTitle, todoListID])

    return (
        <div>
            <h3>
                <EditableSpan
                    title={title}
                    changeTitle={changeTodoTitleHandler}
                />
                <Button
                    onClick={removeTodoListHandler}
                    size={'small'}
                    variant={'contained'}
                    color={'primary'}
                >X</Button>
            </h3>

            <AddItemForm
                addItem={addTaskHandler}
            />

            <List>
                {tasksRender}
            </List>

            <ButtonWithMemo
                title={'all'}
                size={'small'}
                variant={'contained'}
                color={filter === 'all' ? 'secondary' : 'primary'}
                onClick={clickFilterAllHandler}
            />
            <ButtonWithMemo
                title={'active'}
                size={'small'}
                variant={'contained'}
                color={filter === 'active' ? 'secondary' : 'primary'}
                onClick={clickFilterActiveHandler}
            />
            <ButtonWithMemo
                title={'completed'}
                size={'small'}
                variant={'contained'}
                color={filter === 'completed' ? 'secondary' : 'primary'}
                onClick={clickFilterCompletedHandler}
            />
        </div>
    );
})

type ButtonWithMemoPropsType = {
    title: string
    size?: 'small' | 'medium' | 'large'
    variant?: 'text' | 'outlined' | 'contained'
    color?: PropTypes.Color
    onClick: () => void
}

const ButtonWithMemo = React.memo((props: ButtonWithMemoPropsType) => {
    return  <Button
        size={props.size}
        variant={props.variant}
        color={props.color}
        onClick={props.onClick}>{props.title}
    </Button>
})