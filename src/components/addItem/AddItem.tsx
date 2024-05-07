import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import s from './AddItem.module.scss'
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox';

type Props = {
    addItem: (name: string) => void
};
export const AddItem = ({addItem}: Props) => {

    //local state - not business tasks
    let [itemTitle, setNewItemTitle] = useState('');
    let [itemInputError, setItemInputError] = useState<string | null>(null);

    const isTitleToLong = itemTitle.length > 20;
    const ifTaskCanAdded = itemTitle && !isTitleToLong;

    //const inputRef = React.useRef<HTMLInputElement>(null)
    const onClickAddItemHandler = () => {
        addItemWithCheck();
    }

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItemWithCheck();
        }

    }

    const addItemWithCheck = () => {
        const trimmedTaskTitle = itemTitle.trim();
        if (ifTaskCanAdded) {
            if (trimmedTaskTitle) {
                addItem(trimmedTaskTitle);
                setNewItemTitle('');
            } else {
                setItemInputError('Title is required');
                setNewItemTitle('');
            }
        }
    }

    const onChangeSetItemTitle = (title: string) => {
        setNewItemTitle(title);
        setItemInputError(null);
    }

    const buttonStyles = {
        maxWidth: '100%',
        maxHeight: '30px',
        minWidth: '30px',
        minHeight: '30px',
        backgroundColor: '#874CCC'
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChangeSetItemTitle(event.currentTarget.value);
        isTitleToLong ? setItemInputError('Too long') :  setItemInputError(null);
    }

    return (
        <div className={s.addItem}>
            {/*<Input changeTitle={onChangeSetItemTitle}*/}
            {/*       title={itemTitle}*/}
            {/*       onKeyDown={onKeyDownHandler}*/}
            {/*       error={itemInputError ? "Title can't be empty" : itemInputError ? 'Too long' : ''}*/}
            {/*       className={itemInputError ? 'taskInputError' : ''}/>*/}

            <TextField id="outlined-basic"
                       onChange={onChangeInputHandler}
                       onKeyDown={onKeyDownHandler}
                       label={'Введите заголовок'}
                       variant="outlined"
                       value={itemTitle}
                       error={!!itemInputError}
                       helperText={!!itemInputError ? `${itemInputError}` : ''}
                       size='small'/>

            {/*<Button variant="contained"*/}
            {/*        onClick={onClickAddItemHandler}*/}
            {/*        disabled={!ifTaskCanAdded}*/}
            {/*    // style={buttonStyles}*/}
            {/*        size={'small'}>Add</Button>*/}
            <IconButton onClick={onClickAddItemHandler} color={'primary'}>
                <AddBoxIcon/>
            </IconButton>
            {/*<Button title={'Add'} callBack={onClickAddItemHandler} isDisabled={!ifTaskCanAdded} accent></Button>*/}

            {/*{isTitleToLong && <div className={s.taskInputErrorMessage}>Too long</div>}*/}
            {/*{itemInputError && <div className={s.taskInputErrorMessage}>{itemInputError}</div>}*/}
        </div>
    );
};



