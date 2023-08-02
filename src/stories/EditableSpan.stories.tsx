import type {Meta, StoryObj} from '@storybook/react';
import React, {ChangeEvent, useState} from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan, EditableSpanPropsType} from "../Components/EditableSpan";
import {TextField} from "@material-ui/core";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
    title: 'TODO LISTS/EditableSpan',
    component: EditableSpan,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        title: 'change title',
        changeTitle: action('change title')
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const EditableSpanStory: Story = {
    args: {},
};

const EditableSpanChangeTitleStory = ({
    title, changeTitle
}: EditableSpanPropsType) => {

    const [editeMode, setEditMode] = useState<string | boolean>('not change value title')
    const [localTitle, setLocalTitle] = useState<string>(title)

    const changeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let changeInputValue = e.currentTarget.value
        setLocalTitle(changeInputValue)
        changeTitle(localTitle)
    }

    const onEditMod = () => {
        setEditMode(true)

    }

    const offEditMode = () => {
        changeTitle(localTitle)
        if (localTitle.length !== 0) {
            setEditMode(false)
        }
    }

    return (
        editeMode//включен режим редактирования или нет
            ? <TextField
                id="Standard secondary"
                label="Standard secondary"
                color="secondary"
                value={localTitle}
                onChange={changeAddTaskHandler}
                onBlur={offEditMode}
                size={'small'}
            />
            : <span onDoubleClick={onEditMod}>{title}</span>//если не включен то спан
    )
}

export const RewriteTitleStory = () => (
    <EditableSpanChangeTitleStory changeTitle={action('rewrite title')} />
);