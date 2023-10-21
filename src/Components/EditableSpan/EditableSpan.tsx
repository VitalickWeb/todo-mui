import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {TextField} from "@material-ui/core";
import {RequestStatusType} from "../../app/app-reducer";
import {useDebounce} from "../../utils/useDebouns";

export type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
    entityStatus?: RequestStatusType
    disabled: boolean
}

export const EditableSpan = React.memo(({
                                            title, changeTitle, entityStatus, disabled
                                        }: EditableSpanPropsType) => {

    const [editeMode, setEditMode] = useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>(title)

    const deBounce = useDebounce(localTitle, 4000)
    const inputRef = useRef<HTMLInputElement | null>(null);

    const changeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }

    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        changeTitle(localTitle)
        if (localTitle.length !== 0) {
            setEditMode(false)
        }
    }

    useEffect( () => {
        if (deBounce && editeMode) {
            changeTitle(localTitle)
            setEditMode(!editeMode)

            const timeout = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [deBounce])

    return (
        editeMode//включен режим редактирования или нет
            ? <TextField
                inputRef={inputRef}
                id="Standard secondary"
                label="Standard secondary"
                color="secondary"
                size={'small'}
                value={localTitle}
                onChange={changeAddTaskHandler}
                onBlur={offEditMode}
                autoFocus
                disabled={disabled}
            />
            : <span onDoubleClick={onEditMode}>{title}</span>//если не включен то span
    )
})

