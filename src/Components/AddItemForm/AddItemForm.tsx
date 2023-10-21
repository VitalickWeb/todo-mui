import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@material-ui/core";


export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo((props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | boolean>(false)//пока в переменной error ошибки нет

    const changeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)//если символ будет добавлен в импуте, зануляем стэйт
        setTitle(e.currentTarget.value)
    }

    const changeEnterTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            clickAddTaskHandler()
        }
    }

    const clickAddTaskHandler = () => {
        if (title.trim() !== '') {//если тайтл пустой, то не добавляем таску
            props.addItem(title)//отправляет значение накопившегося в тайтле
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
                disabled={props.disabled}
            />

            <Button style={{
                width: "20px",
                height: "40px",
                marginLeft: "5px"
            }}
                onClick={clickAddTaskHandler}
                size={'small'}
                variant={'contained'}
                color={'primary'}
                disabled={props.disabled}
            >+</Button>
        </div>
    )
})



