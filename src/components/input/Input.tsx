import React, { ChangeEvent } from 'react';

type InputProps = {
    changeTitle: (title: string) => void;
    title: string;
    onKeyDown: any;
}

export const Input = ({changeTitle, title, onKeyDown}: InputProps) => {

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        changeTitle(event.currentTarget.value);
    }

    return (
        <input value={title}
               onChange={onChangeInputHandler}
               onKeyDown={onKeyDown}
               type="text"/>
    );
};

