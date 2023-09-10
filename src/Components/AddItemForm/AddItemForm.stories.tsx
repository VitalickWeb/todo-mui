import type { StoryObj } from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from './AddItemForm';
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {action} from "@storybook/addon-actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'TODO LISTS/AddItemForm',
    component: AddItemForm,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        addItem: {
            description: 'write the title in the input and on click button, add tod-list',
            action: 'clicked',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const AddItemFormStory: Story = {
    args: {
        addItem: action('button clicked inside form')
    },
};

const AddItemForm2: React.FC<AddItemFormPropsType> = (props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | boolean>('not filled input')

    const changeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        let newTitleTodo = e.currentTarget.value
        setTitle(newTitleTodo)
    }

    const changeEnterTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        let key = e.key
        if (key === 'Enter') {
            clickAddTaskHandler()
        }
    }

    const clickAddTaskHandler = () => {
        let cutSpace = title.trim()
        if (cutSpace !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Enter title');
        }
    }

    return (
        <div>
            <TextField
                size={'small'}
                id="outlined-secondary"
                label="Outlined secondary"
                variant="outlined"
                color="secondary"
                value={title}
                onChange={changeAddTaskHandler}
                onKeyDown={changeEnterTaskHandler}
                error={!!error}
                helperText={error && 'Title is required'}
            />

            <Button style={ {
                width: "20px",
                height: "40px",
                marginLeft: "5px"
            }}
                    onClick={clickAddTaskHandler}
                    size={'small'}
                    variant={'contained'}
                    color={'primary'}
            >+</Button>
        </div>
    )
}

export const AddItemFormErrorStory = () => (
    <AddItemForm2 addItem={action('button clicked inside form')} />
);
