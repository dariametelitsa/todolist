import React, { lazy, Suspense, useCallback } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Navigate } from 'react-router-dom';
import { PATH } from 'common/routes/PATH';
import { useSelector } from 'react-redux';
import { AddItem } from 'common/components/addItem/ui/AddItem';
import { TodolistContainerSkeleton } from 'features/todolistList/ui/todolist/ui/TodolistContainerSkeleton';
import { useAddTodolistMutation, useGetTodolistQuery } from 'features/todolistList/api/todolistAPI';
import { selectAppIsLogin } from 'app/model/appSlice';

const Todolist = lazy(() => import('features/todolistList/ui/todolist/ui/Todolist'));

export const TodolistlistsContainer: React.FC = () => {
  const { data: todoLists } = useGetTodolistQuery();
  const [addTodolist] = useAddTodolistMutation();
  const isLoggedIn = useSelector(selectAppIsLogin);

  const addTodolistCallback = useCallback(
    (title: string) => {
      return addTodolist(title);
    },
    [addTodolist]
  );

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <>
      <Grid container spacing={2} sx={{ m: 0, mb: 5 }}>
        <AddItem addItem={addTodolistCallback}></AddItem>
      </Grid>
      <Suspense fallback={<TodolistContainerSkeleton />}>
        <Grid container spacing={3}>
          {todoLists?.map((td) => {
            return <Todolist todolist={td} key={td.id} />;
          })}
        </Grid>
      </Suspense>
    </>
  );
};
