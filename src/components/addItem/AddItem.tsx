import * as React from 'react'
import s from './AddItem.module.scss'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { useItemForm } from './hooks/useAddItem'

export type AddItemProps = {
  addItem: (name: string) => void
  disabled?: boolean
}

export const AddItem = React.memo(({ addItem, disabled }: AddItemProps) => {
  const { itemTitle, onChangeInputHandler, onKeyDownHandler, itemInputError, onClickAddItemHandler } =
    useItemForm(addItem)

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
        size="small"
        disabled={disabled}
      />

      <IconButton onClick={onClickAddItemHandler} color={'primary'} disabled={disabled}>
        <AddBoxIcon />
      </IconButton>
    </div>
  )
})
