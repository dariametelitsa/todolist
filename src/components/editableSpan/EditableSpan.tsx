import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import TextField from "@mui/material/TextField";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import DoneIcon from '@mui/icons-material/Done';

export type EditableSpanProps = {
    oldTitle: string
    idToChange: string
    updateItem: (id: string, newTitle: string) => void
    maxLength?: number
};

export const EditableSpan = React.memo(({idToChange, oldTitle, updateItem, maxLength = 30}: EditableSpanProps) => {

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

    return (
        editMode
            ? <>
                <TextField id="outlined-basic"
                           onChange={onChangeTitleHandler}
                           onKeyDown={onKeyDownHandler}
                           variant="outlined"
                           onBlur={activateViewMode}
                           autoFocus
                           value={newTitle}
                           style={{flexGrow: 1}}
                           size='small'
                           inputProps={{ maxLength: maxLength }}
                />
                <IconButton onClick={()=>{setEditMode(true)}} color={'inherit'} size={'small'} >
                    <DoneIcon/>
                </IconButton>
            </>
            : <>
                <span onDoubleClick={activateEditModeHandler} style={{flexGrow: 1, whiteSpace: 'normal'}}>{oldTitle}</span>
                <IconButton onClick={(e)=>{
                    e.preventDefault();
                    setEditMode(true)}} color={'inherit'} size={'small'} >
                    <EditIcon/>
                </IconButton>
            </>
    );
});