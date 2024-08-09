// @flow
import * as React from 'react';
import { EditableSpan } from 'common/components/editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type Props = {
  title: string;
  id: string;
  entityStatus: string;
  changeTodolistTitleHandler: (todolistId: string, title: string) => void;
  deleteTodolistHandler: () => void;
};
export const Title = ({ id, title, entityStatus, changeTodolistTitleHandler, deleteTodolistHandler }: Props) => {
  return (
    <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
      <EditableSpan
        oldTitle={title}
        idToChange={id}
        updateItem={changeTodolistTitleHandler}
        isDisabled={entityStatus === 'loading'}
      />
      <IconButton aria-label="delete" onClick={deleteTodolistHandler} disabled={entityStatus === 'loading'}>
        <DeleteOutlineIcon />
      </IconButton>
    </h3>
  );
};
