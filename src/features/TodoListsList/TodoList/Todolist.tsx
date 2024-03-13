import React, {useCallback} from 'react';
import {AddItemForm} from "../../../Components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../Components/EditableSpan/EditableSpan";
import {Button, List, PropTypes} from "@material-ui/core";
import {Task} from "./Task/Task";
import {WordFilter} from "../todoList-reducers";
import {TaskDomainType} from "../tasks-redusers";
import {useAppDispatch} from "../../../app/store";
import {TaskStatuses} from "../../../API/todolist-api";
import {RequestStatusType} from "../../../app/app-reducer";

export type TasksPropsType = {
    todoListID: string
    title: string
    filter: string
    tasks: TaskDomainType[]
    removeTask: (todoListID: string, taskId: string) => void
    removeTodo: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    filterTasks: (todoListID: string, filter: WordFilter) => void
    changeStatus: (todoListID: string, idStatus: string, status: TaskStatuses) => void
    changeTaskTitle: (todoListID: string, idStatus: string, newTitle: string) => void
    changeTodolistTitle: (todoListID: string, title: string) => void
    entityStatus: RequestStatusType
}

export const Todolist = React.memo(({
    todoListID, title, tasks,
    removeTask, removeTodo, addTask,
    filterTasks, changeStatus,
    changeTodolistTitle, changeTaskTitle, filter,
    entityStatus,
}: TasksPropsType) => {

    //const dispatch = useAppDispatch()

    // useEffect(() => {
    //     dispatch(fetchTasksThunk(todoListID));
    // }, [todoListID])

    let filteredTasks = tasks;

    if (filter === 'active') {
        filteredTasks = tasks.filter((f: { status: number }) => f.status === TaskStatuses.new || f.status === TaskStatuses.inProgress)
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter((f: { status: number }) => f.status === TaskStatuses.completed)
    }

    const tasksRender = tasks.length ? filteredTasks.map(t => {

            return (
                <li key={t.id} className={t.status ? 'active-checked' : ''}>
                    <Task
                        task={t}
                        todoListID={todoListID}
                        removeTask={removeTask}
                        changeStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                        disabled={t.entityStatus === 'loading'}
                        entityStatus={t.entityStatus}
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
        addTask(title, todoListID)
    }, [addTask, title, todoListID])

    const changeTodoTitleHandler = useCallback((newTitle: string) => {
        changeTodolistTitle(todoListID, newTitle)
    }, [changeTodolistTitle, todoListID])

    return (
        <div>
            <h3>
                <EditableSpan
                    title={title}
                    changeTitle={changeTodoTitleHandler}
                    disabled={entityStatus === 'loading'}
                />
                <Button
                    onClick={removeTodoListHandler}
                    size={'small'}
                    variant={'contained'}
                    color={'primary'}
                    disabled={entityStatus === 'loading'}
                >X</Button>
            </h3>

            <AddItemForm
                addItem={addTaskHandler}
                disabled={entityStatus === 'loading'}
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
    size: 'small' | 'medium' | 'large'
    variant: 'text' | 'outlined' | 'contained'
    color: PropTypes.Color
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