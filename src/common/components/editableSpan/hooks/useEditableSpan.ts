import * as React from "react";
import { ChangeEvent, useState } from "react";


export const UseEditableSpan = (
    idToChange: string,
    oldTitle: string,
    updateItem: (id: string, newTitle: string) => void) => {

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState<string>(oldTitle);

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

    return {
        activateEditModeHandler,
        activateViewMode,
        onChangeTitleHandler,
        onKeyDownHandler,
        setEditMode,
        editMode,
        newTitle,
    };
};