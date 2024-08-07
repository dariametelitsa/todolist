import React, { lazy, Suspense, useCallback } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Navigate } from 'react-router-dom';
import { PATH } from 'common/routes/PATH';
import { useAppDispatch } from 'app/store';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../auth/model/authSlice';
import { addTodolist, selectTodolists } from './model/todolistsSlice';
import { AddItem } from 'common/components/addItem/AddItem';
import CircularProgress from '@mui/material/CircularProgress';
// import Todolist from './todolist/Todolist';

const Todolist = lazy(() => import('./todolist/Todolist'));

export const TodolistlistsContainer: React.FC = () => {
  const todoLists = useSelector(selectTodolists);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const addTodolistCallback = useCallback(
    (title: string) => {
      dispatch(addTodolist(title));
    },
    [dispatch]
  );

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <>
      <Grid container spacing={2} sx={{ m: 0, mb: 5 }}>
        <AddItem addItem={addTodolistCallback}></AddItem>
      </Grid>
      <Suspense fallback={<CircularProgress />}>
        <Grid container spacing={3}>
          {todoLists.map((td) => {
            return <Todolist todolist={td} key={td.id} />;
          })}
        </Grid>
      </Suspense>
    </>
  );
};
