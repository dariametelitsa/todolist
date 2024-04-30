// @flow 
import * as React from 'react';
import { ChangeEvent, useState } from "react";


export type EditableSpanProps = {
    oldTitle: string
    updateItem: (newTitle: string) => void
};

export const EditableSpan = ({oldTitle, updateItem}: EditableSpanProps) => {

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState<string>(oldTitle);

    const activateEditModeHandler = () => {
        setEditMode(!editMode);
        if(editMode) {
            updateItem(newTitle);
        }
    }

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value);
    }

    return (
        editMode
            ? <input value={newTitle} onChange={onChangeTitleHandler} onBlur={activateEditModeHandler} autoFocus/>
            : <span onDoubleClick={activateEditModeHandler}>{oldTitle}</span>
    );
};