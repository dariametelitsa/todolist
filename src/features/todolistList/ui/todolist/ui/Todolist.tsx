import React, { lazy, Suspense, useDeferredValue } from 'react';
import { TodoListDomain } from 'common/data/dataPropsTypes';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { useTodolist } from 'features/todolistList/ui/todolist/lib/useTodolist';
import { AddItem } from 'common/components/addItem/AddItem';
import { FilterTasksButtons } from 'features/todolistList/ui/todolist/filtersTasksButtons/FilterTasksButtons';
import { CoverImage } from 'common/components/coverImage/CoverImage';
import CircularProgress from '@mui/material/CircularProgress';
import { TodolistTitle } from 'features/todolistList/ui/todolist/todolistTitle/TodolistTitle';

const Task = lazy(() => import('features/todolistList/ui/todolist/ui/task/ui/Task'));

type Props = {
  todolist: TodoListDomain;
};

const Todolist = React.memo(({ todolist }: Props) => {
  const { id, title, filter, coverImage, entityStatus } = todolist;

  const { sorterTasks, deleteAllTasksHandler, addItemHandler, changeCoverHandler } = useTodolist(id, filter);

  const deferredTasks = useDeferredValue(sorterTasks);

  const tasksForTodolist = sorterTasks.map((task) => {
    return <Task key={task.id} todolistId={id} task={task} entityStatus={entityStatus} />;
  });

  return (
    <Grid xs={12} md={6} lg={4}>
      <Paper sx={{ p: 2 }}>
        <div>
          <CoverImage image={coverImage && coverImage} updateImage={changeCoverHandler} />
          <TodolistTitle title={title} id={id} entityStatus={entityStatus} />
          <AddItem addItem={addItemHandler} disabled={entityStatus === 'loading'} />

          <Suspense fallback={<CircularProgress />}>
            <List sx={{ width: '100%', height: 200, overflow: 'auto' }}>
              {deferredTasks.length === 0 ? <p>Задач нет</p> : tasksForTodolist}
            </List>
          </Suspense>

          <Grid container justifyContent="center">
            <Button
              size="small"
              onClick={() => {
                deleteAllTasksHandler();
              }}>
              Delete all
            </Button>
          </Grid>
          <FilterTasksButtons filter={filter} id={id} />
        </div>
      </Paper>
    </Grid>
  );
});

export default Todolist;
