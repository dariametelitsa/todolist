import React, { ChangeEvent } from 'react';

type InputProps = {
    changeTitle: (title: string) => void;
    title: string;
    taskTitleInput: any
}

export const Input = ({changeTitle, title, taskTitleInput}: InputProps) => {

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        changeTitle(event.currentTarget.value);
    }

    return (
        <input value={title}
               onChange={onChangeInputHandler}
               type="text"
               ref={taskTitleInput}/>
    );
};

