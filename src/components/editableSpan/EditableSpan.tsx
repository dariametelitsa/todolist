// @flow 
import * as React from 'react';
import { ChangeEvent, useState } from "react";
import { Input } from "../input/Input";

type EditableSpanProps = {
    oldTitle: string
};
export const EditableSpan = ({oldTitle}: EditableSpanProps) => {

    const [newTitle, setNewTitle] = useState<string>(oldTitle);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value);
    }

    return (
        <input value={newTitle} onChange={onChangeHandler} />
    );
};