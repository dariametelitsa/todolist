import * as React from 'react';
import { useState } from 'react';
import s from './AddItem.module.scss'
import { Input } from "../input/Input";
import Button from '@mui/material/Button';

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

    const onKeyDownHandler = () => {
        addItemWithCheck();
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

    return (
        <div className={s.addItem}>
            <Input changeTitle={onChangeSetItemTitle}
                   title={itemTitle}
                   onKeyDown={onKeyDownHandler}
                   className={itemInputError ? 'taskInputError' : ''}/>
            <Button variant="contained"
                    onClick={onClickAddItemHandler}
                    disabled={!ifTaskCanAdded}
                    // style={buttonStyles}
                    size={'small'}>Add</Button>
            {/*<Button title={'Add'} callBack={onClickAddItemHandler} isDisabled={!ifTaskCanAdded} accent></Button>*/}

            {isTitleToLong && <div className={s.taskInputErrorMessage}>Too long</div>}
            {itemInputError && <div className={s.taskInputErrorMessage}>{itemInputError}</div>}
        </div>
    );
};



