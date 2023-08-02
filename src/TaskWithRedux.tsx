import React from 'react';
// import {Checkbox, IconButton} from "@material-ui/core";
// import {EditableSpan} from "./Components/EditableSpan";
// import {Delete} from "@material-ui/icons";
// import {useDispatch} from "react-redux";
// import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-redusers";
// import {TaskType} from "./Components/Todolist";
//
// type TaskWithReduxPropsType = {
//     todoListID: string
//     task: TaskType
// }
//
// //компонента таски в которую не входят колбэки.
// export const TaskWithRedux = memo(({todoListID, task}: TaskWithReduxPropsType) => {
//
//     let dispatch = useDispatch()
//
//     const clickRemoveHandler = () => {
//         dispatch(removeTaskAC(todoListID, task.id))
//     }
//
//     const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
//         let newCheckboxValue = e.currentTarget.checked
//         dispatch(changeTaskStatusAC(todoListID, task.id, newCheckboxValue))
//     }
//
//     const changeTaskTitle = (title: string) => {
//         dispatch(changeTaskTitleAC(task.id, todoListID, title))
//     }
//
//     return (
//         <div>
//             <Checkbox
//                 value="checkedA"
//                 inputProps={{'aria-label': 'Checkbox A'}}
//                 checked={task.isDone}
//                 onChange={changeStatus}
//                 color={'primary'}
//             />
//
//             <EditableSpan
//                 title={task.title}
//                 changeTitle={changeTaskTitle}
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
