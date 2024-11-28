import * as React from 'react';
import { EditableSpan } from 'common/components/editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDeleteTodolistMutation, useUpdateTodolistMutation } from 'features/todolistList/api/todolistAPI';

type Props = {
  title: string;
  id: string;
  entityStatus: string;
};

export const TodolistTitle = ({ id, title, entityStatus }: Props) => {
  const [deleteTodolist] = useDeleteTodolistMutation();
  const [changeTodolistTitle] = useUpdateTodolistMutation();

  const changeTodolistTitleHandler = (todolistId: string, title: string) => {
    changeTodolistTitle({ todolistId, title });
  };

  const deleteTodolistHandler = () => {
    deleteTodolist(id);
  };

  return (
    <h3
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 0,
        marginTop: '30px',
        wordBreak: 'break-all',
      }}>
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
