import * as React from 'react';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import { UseEditableSpan } from 'common/components/editableSpan/lib/useEditableSpan';

export type EditableSpanProps = {
  oldTitle: string;
  idToChange: string;
  updateItem: (id: string, newTitle: string) => void;
  maxLength?: number;
  isDisabled?: boolean;
};

export const EditableSpan = React.memo(
  ({ idToChange, oldTitle, updateItem, maxLength = 30, isDisabled }: EditableSpanProps) => {
    const {
      activateEditModeHandler,
      activateViewMode,
      onChangeTitleHandler,
      onKeyDownHandler,
      setEditMode,
      editMode,
      newTitle,
    } = UseEditableSpan(idToChange, oldTitle, updateItem);

    return editMode && !isDisabled ? (
      <>
        <TextField
          id="outlined-basic"
          onChange={onChangeTitleHandler}
          onKeyDown={onKeyDownHandler}
          variant="outlined"
          onBlur={activateViewMode}
          autoFocus
          value={newTitle}
          style={{ flexGrow: 1 }}
          size="small"
          inputProps={{ maxLength: maxLength }}
        />
        <IconButton
          onClick={() => {
            setEditMode(true);
          }}
          disabled={isDisabled}
          color={'inherit'}
          size={'small'}>
          <DoneIcon />
        </IconButton>
      </>
    ) : (
      <>
        <span onDoubleClick={activateEditModeHandler} style={{ flexGrow: 1, whiteSpace: 'normal' }}>
          {oldTitle}
        </span>
        <IconButton
          disabled={isDisabled}
          onClick={(e) => {
            e.preventDefault();
            setEditMode(true);
          }}
          color={'inherit'}
          size={'small'}>
          <EditIcon />
        </IconButton>
      </>
    );
  }
);
