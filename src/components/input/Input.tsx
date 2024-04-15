import React, { ChangeEvent, InputHTMLAttributes } from 'react';

type InputProps = {
    changeTitle: (title: string) => void;
    title: string;
    onKeyDown: () => void;
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({changeTitle, title, onKeyDown, ...restProps}: InputProps) => {

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

