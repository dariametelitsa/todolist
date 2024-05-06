// @flow
import * as React from 'react';
import { ChangeEvent, useState } from 'react';


export type EditableSpanProps = {
    oldTitle: string
    idToChange: string
    updateItem: (id: string, newTitle: string) => void
    maxLength?: number
};

export const EditableSpan = ({idToChange, oldTitle, updateItem, maxLength = 25}: EditableSpanProps) => {

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState<string>(oldTitle);

    const activateEditModeHandler = () => {
        setEditMode(!editMode);
        if (editMode) {
            newTitle ? updateItem(idToChange, newTitle) : updateItem(idToChange, oldTitle);
        }
    }

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value);
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setEditMode(!editMode);
        }
        if (e.key === 'Enter') {
            activateEditModeHandler();
        }
    }

    return (
        editMode
            ? <input value={newTitle}
                     onChange={onChangeTitleHandler}
                     onKeyDown={onKeyDownHandler}
                     onBlur={activateEditModeHandler}
                     maxLength={maxLength} autoFocus/>
            : <span onDoubleClick={activateEditModeHandler}>{oldTitle}</span>
    );
};