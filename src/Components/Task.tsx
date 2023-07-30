import React, {ChangeEvent, useCallback} from 'react';
// import {Checkbox, IconButton} from "@material-ui/core";
// import {EditableSpan} from "./EditableSpan";
// import {Delete} from "@material-ui/icons";
// import {TaskType} from "./Todolist";
//
// export type TaskPropsType = {
//     task: TaskType
//     todoListID: string
//     removeTask: (todoListID: string, taskId: string) => void
//     changeStatus: (todoListID: string, idStatus: string, isDone: boolean) => void
//     changeTaskTitle: (todoListID: string, idStatus: string, title: string) => void
// }
//
// export const Task = React.memo(({
//     task, todoListID,
//     removeTask, changeTaskTitle, changeStatus
// }: TaskPropsType) => {
//
//     const clickRemoveHandler = useCallback(() => {
//         removeTask(todoListID, task.id)
//     }, [removeTask, todoListID, task.id])
//
//     const changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
//         changeStatus(todoListID, task.id, e.currentTarget.checked)
//     }, [changeStatus, todoListID, task.id])
//
//     const changeTaskTitleHandler = useCallback((title: string) => {
//         changeTaskTitle(todoListID, task.id, title)
//     }, [changeTaskTitle, todoListID, task.id])
//
//     return (
//         <div>
//             <Checkbox
//                 value="checkedA"
//                 inputProps={{'aria-label': 'Checkbox A'}}
//                 checked={task.isDone}
//                 onChange={changeStatusHandler}
//                 color={'primary'}
//             />
//
//             <EditableSpan
//                 title={task.title}
//                 changeTitle={changeTaskTitleHandler}
//             />
//
//             <IconButton
//                 aria-label="delete"
//                 onClick={clickRemoveHandler}
//                 size={'small'}>
//                 <Delete/>
//             </IconButton>
//         </div>
//     );
// });

