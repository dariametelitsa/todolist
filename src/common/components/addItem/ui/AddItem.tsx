import * as React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useItemForm } from 'common/components/addItem/lib/useAddItem';

export type Props = {
  addItem: (name: string) => Promise<any>;
  disabled?: boolean;
};

export const AddItem = React.memo(({ addItem, disabled }: Props) => {
  const { itemTitle, changeInputHandler, saveItemTitleHandler, itemInputError, onClickAddItemHandler } =
    useItemForm(addItem);

  return (
    <div style={{ width: '100%', display: 'flex' }}>
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
        sx={{ mt: 2, width: 1 }}
      />

      <IconButton onClick={onClickAddItemHandler} color={'primary'} disabled={disabled}>
        <AddBoxIcon />
      </IconButton>
    </div>
  );
});
