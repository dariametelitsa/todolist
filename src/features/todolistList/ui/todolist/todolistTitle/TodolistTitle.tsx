// @flow
import * as React from 'react';
import { EditableSpan } from 'common/components/editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { changeTodolistTitle, deleteTodolist } from 'features/todolistList/model/todolistsSlice';
import { useAppDispatch } from 'app/store';

type Props = {
  title: string;
  id: string;
  entityStatus: string;
};

export const TodolistTitle = ({ id, title, entityStatus }: Props) => {
  const dispatch = useAppDispatch();
  const changeTodolistTitleHandler = (todolistId: string, title: string) => {
    dispatch(changeTodolistTitle({ todolistId, title }));
  };

  const deleteTodolistHandler = () => {
    dispatch(deleteTodolist(id));
  };

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
