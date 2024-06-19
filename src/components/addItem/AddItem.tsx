import * as React from 'react';
import s from './AddItem.module.scss'
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useItemForm } from "./hooks/useAddItem";

type Props = {
    addItem: (name: string) => void
};

export const AddItem = React.memo(({addItem}: Props) => {
    const {itemTitle,
        onChangeInputHandler,
        onKeyDownHandler,
        itemInputError,
        onClickAddItemHandler,
    } = useItemForm(addItem);

    return (
        <div className={s.addItemBox}>
            <TextField
                       onChange={onChangeInputHandler}
                       onKeyDown={onKeyDownHandler}
                       label={'Введите заголовок'}
                       variant="outlined"
                       value={itemTitle}
                       error={!!itemInputError}
                       helperText={!!itemInputError ? `${itemInputError}` : ' '}
                       size='small'
                       />

            <IconButton onClick={onClickAddItemHandler} color={'primary'}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    );
});



