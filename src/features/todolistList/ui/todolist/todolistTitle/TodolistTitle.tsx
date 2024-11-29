import * as React from 'react';
import { EditableSpan } from 'common/components/editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  todolistApi,
  useDeleteTodolistMutation,
  useUpdateTodolistMutation,
} from 'features/todolistList/api/todolistAPI';
import { AppStatus } from 'app/model/appSlice';
import { useAppDispatch } from 'app/store';

type Props = {
  title: string;
  id: string;
  entityStatus: AppStatus;
};

export const TodolistTitle = ({ id, title, entityStatus }: Props) => {
  const [deleteTodolist] = useDeleteTodolistMutation();
  const [changeTodolistTitle] = useUpdateTodolistMutation();
  const dispatch = useAppDispatch();

  const updateQueryData = (status: AppStatus) => {
    dispatch(
      todolistApi.util.updateQueryData('getTodolist', undefined, (state) => {
        const index = state.findIndex((td) => td.id === id);
        if (index !== -1) {
          console.log('click');
          state[index].entityStatus = status;
        }
      })
    );
  };

  const changeTodolistTitleHandler = (todolistId: string, title: string) => {
    updateQueryData('loading');
    changeTodolistTitle({ todolistId, title })
      .unwrap()
      .finally(() => updateQueryData('idle'));
  };

  const deleteTodolistHandler = () => {
    updateQueryData('loading');
    deleteTodolist(id)
      .unwrap()
      .finally(() => updateQueryData('idle'));
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
