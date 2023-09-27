import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../Components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskApiType, TaskStatuses} from "../../../../API/todolist-api";
import {RequestStatusType} from "../../../../app/app-reducer";


export type TaskPropsType = {
    task: TaskApiType
    todoListID: string
    removeTask: (todoListID: string, taskId: string) => void
    changeStatus: (todoListID: string, idStatus: string, status: TaskStatuses) => void
    changeTaskTitle: (todoListID: string, idStatus: string, newTitle: string) => void
    entityStatus: RequestStatusType
    disabled: boolean
}

export const Task = React.memo(({
    task, todoListID,
    removeTask, changeTaskTitle, changeStatus, disabled, entityStatus
}: TaskPropsType) => {

    const clickRemoveHandler = useCallback(() => {
        removeTask(todoListID, task.id)
    }, [removeTask, todoListID, task.id])

    const changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {

        let checked = e.currentTarget.checked === true ? TaskStatuses.completed : TaskStatuses.inProgress
        changeStatus(todoListID, task.id, checked)

    }, [changeStatus, todoListID, task.id])

    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        changeTaskTitle(todoListID, task.id, newTitle)
    }, [changeTaskTitle, todoListID, task.id])

    return (
        <div>
            <Checkbox
                value="checkedA"
                inputProps={{'aria-label': 'Checkbox A'}}
                checked={task.status === TaskStatuses.completed}
                onChange={changeStatusHandler}
                color={'primary'}
                disabled={disabled}
            />

            <EditableSpan
                title={task.title}
                changeTitle={changeTaskTitleHandler}
                disabled={disabled}
            />

            <IconButton
                aria-label="delete"
                onClick={clickRemoveHandler}
                size={'small'}
                disabled={disabled}
            ><Delete/>
            </IconButton>
        </div>
    );
});

