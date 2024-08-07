import React, { lazy, Suspense, useDeferredValue } from 'react';
import { TodoListDomainType } from 'common/data/dataPropsTypes';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { useTodolist } from './hooks/useTodolist';
import { EditableSpan } from 'common/components/editableSpan/EditableSpan';
import { AddItem } from 'common/components/addItem/AddItem';
import { FiltersForTasks } from 'common/components/filtersForTasks/FiltersForTasks';
import { CoverImage } from 'common/components/coverImage/CoverImage';
import CircularProgress from '@mui/material/CircularProgress';
// import { Task } from './task/Task';

const Task = lazy(() => import('./task/Task'));

type TodolistListProps = {
  todolist: TodoListDomainType;
};

const Todolist: React.FC<TodolistListProps> = React.memo(({ todolist }) => {
  const { id, title, filter, coverImage, entityStatus } = todolist;

  const {
    sorterTasks,
    onClickFilterHandlerCreator,
    onClickHandlerDeleteAllTasks,
    addItemHandler,
    onChangeCoverHandler,
    changeTodolistTitleHandler,
    deleteTodolistHandler,
  } = useTodolist(id, filter);

  const deferredTasks = useDeferredValue(sorterTasks);

  const tasksForTodolist = sorterTasks.map((task) => {
    return <Task key={task.id} todolistId={id} task={task} entityStatus={entityStatus} />;
  });

  return (
    <Grid xs={12} md={6} lg={4}>
      <Paper sx={{ p: 2 }}>
        <div>
          <CoverImage image={coverImage && coverImage} updateImage={onChangeCoverHandler} />
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
                onClickHandlerDeleteAllTasks();
              }}>
              Delete all
            </Button>
          </Grid>
          <FiltersForTasks filter={filter} filterCheck={onClickFilterHandlerCreator} />
        </div>
      </Paper>
    </Grid>
  );
});

export default Todolist;
