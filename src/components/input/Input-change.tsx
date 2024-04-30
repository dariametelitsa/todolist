import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react';

type InputProps = {
    changeTitle: (title: string) => void;
    title: string;
    onKeyDown: () => void;
} & InputHTMLAttributes<HTMLInputElement>

export const InputChange = ({changeTitle, title, onKeyDown, ...restProps}: InputProps) => {

    let [itemTitle, setNewItemTitle] = useState('');

    const addCheck = () => {
        const trimmedTaskTitle = itemTitle.trim();
        if(trimmedTaskTitle !== '')
        {
            setNewItemTitle(trimmedTaskTitle);
        }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        changeTitle(event.currentTarget.value);
    }

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onKeyDown();
        }
    }

    return (
        <input value={title}
               onChange={onChangeInputHandler}
               onKeyDown={onKeyDownHandler}
               type="text"
               {...restProps}/>
    );
};

