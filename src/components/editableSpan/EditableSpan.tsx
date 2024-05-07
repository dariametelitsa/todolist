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
    const [newTitle, setNewTitle] = useState<string>('');

    const activateEditModeHandler = () => {
        setEditMode(true);
        setNewTitle(oldTitle)
    }
    const activateViewMode = () => {
        setEditMode(false);
        newTitle.length !== 0 ? updateItem(idToChange, newTitle) : updateItem(idToChange, oldTitle);
        newTitle.length !== 0 ? setNewTitle(newTitle) : setNewTitle(oldTitle);
    }

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value);
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setEditMode(!editMode);
            setNewTitle(oldTitle);
        }
        if (e.key === 'Enter') {
            activateViewMode();
        }
    }

    return (
        editMode
            ? <input value={newTitle}
                     onChange={onChangeTitleHandler}
                     onKeyDown={onKeyDownHandler}
                     onBlur={activateViewMode}
                     maxLength={maxLength} autoFocus/>
            : <span onDoubleClick={activateEditModeHandler}>{oldTitle}</span>
    );
};