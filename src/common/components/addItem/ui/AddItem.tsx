import * as React from 'react';
import s from 'common/components/addItem/ui/AddItem.module.scss';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useItemForm } from 'common/components/addItem/lib/useAddItem';

export type AddItemProps = {
  addItem: (name: string) => Promise<any>;
  disabled?: boolean;
};

export const AddItem = React.memo(({ addItem, disabled }: AddItemProps) => {
  const { itemTitle, changeInputHandler, saveItemTitleHandler, itemInputError, onClickAddItemHandler } =
    useItemForm(addItem);

  return (
    <div className={s.addItem}>
      <TextField
        onChange={changeInputHandler}
        onKeyDown={saveItemTitleHandler}
        label={'Введите заголовок'}
        variant="outlined"
        value={itemTitle}
        error={!!itemInputError}
        helperText={!!itemInputError ? `${itemInputError}` : ' '}
        size="small"
        disabled={disabled}
        className={s.addItemBox}
      />

      <IconButton onClick={onClickAddItemHandler} color={'primary'} disabled={disabled}>
        <AddBoxIcon />
      </IconButton>
    </div>
  );
});
