import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo(({
    title, changeTitle
}: EditableSpanPropsType) => {

    const [editeMode, setEditMode] = useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>(title)

    const changeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
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
})