import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react';

type InputProps = {
    changeTitle: (title: string) => void;
    title: string;
} & InputHTMLAttributes<HTMLInputElement>

export const InputChange = ({changeTitle, title, ...restProps}: InputProps) => {

    let [itemTitle, setNewItemTitle] = useState(title);

    const addCheck = () => {
        const trimmedTaskTitle = itemTitle.trim();
        if(trimmedTaskTitle !== '')
        {
            changeTitle(trimmedTaskTitle);
        }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        // changeTitle(event.currentTarget.value);
        setNewItemTitle(event.currentTarget.value);
        addCheck();

    }

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addCheck();
        }
    }

    return (
        <input value={itemTitle}
               onChange={onChangeInputHandler}
               onKeyDown={onKeyDownHandler}
               type="text"
               {...restProps}/>
    );
};

