import type {StoryObj} from '@storybook/react';
import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "../Components/Task";
import {TaskPriorities, TaskStatuses} from "../API/todolist-api";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'TODO LISTS/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        task: {id: '8138hugo', title: 'learn api', isDone: true},
        todoListID: '12321iui',
        removeTask: action('delete task'),
        changeStatus: action('change task status'),
        changeTaskTitle: action('change title'),
    }
};
export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const TaskIsDoneStory: Story = {
    args: {},
};

export const TaskIsDoneStory2: Story = {
    args: {
        task: {
            id: '8138hugo',
            title: 'learn api',
            status: 0,
            description: 'string',
            todoListId: 'string',
            order: 0,
            priority: 0,
            startDate: 'string',
            deadline: 'string',
            addedDate: 'string'
        },
    },
};

// export const TaskStory2 = ({
//     task, todoListID,
//     removeTask, changeTaskTitle, changeStatus
// }: TaskPropsType) => {
//
//     const clickRemoveHandler = () => {
//         removeTask(todoListID, task.id)
//     }
//
//     const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         changeStatus(todoListID, task.id, e.currentTarget.checked)
//     }
//
//     const changeTaskTitleHandler = (title: string) => {
//         changeTaskTitle(todoListID, task.id, title)
//     }
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
// };

// const RemoveTaskStory = () => (
//     <TaskStory2 removeTask={action('delete task')} />
// );
// const ChangeStatusStory = () => (
//     <TaskStory2 changeStatus={action('change task status')} />
// );
// const ChangeTaskTitleStory = () => (
//     <TaskStory2 changeTaskTitle={action('change title')} />
// );
