import React, { ChangeEvent } from 'react';

type InputProps = {
    changeTitle: (title: string) => void;
    title: string;
}

export const Input = ({changeTitle, title}: InputProps) => {

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        changeTitle(event.currentTarget.value);
    }

    return (
        <input value={title}
               onChange={onChangeInputHandler}
               type="text"/>
    );
};

