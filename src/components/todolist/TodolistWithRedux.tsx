import React from "react";
import { TodoListDomainType } from "../../data/dataPropsTypes";
import styles from './Todolist.module.scss';
import { AddItem } from "../addItem/AddItem";
import { EditableSpan } from "../editableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import List from '@mui/material/List';

import Box from '@mui/material/Box';
import { filterButtonsContainerSx } from "./Todolist.styles";
import { CoverImage } from "../coverImage/CoverImage";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from '@mui/material/Paper';
import { removeTodolistAC } from "../../model/todolistsReducer";
import { ButtonMemo } from "../button/ButtonMemo";
import { Task } from "../task/Task";
import { useTodolistWithRedux } from "./hooks/useTodolistWithRedux";
import { FiltersForTasks } from "../filtersForTasks/FiltersForTasks";

type Props = {
    todolist: TodoListDomainType
}
const TodolistWithRedux = React.memo(({todolist}: Props) => {
    const {id, title, filter, coverImage} = todolist;

const {dispatch,
    sorterTasks,
    onClickFilterHandlerCreator,
    onClickHandlerDeleteAllTasks,
    addItemHandler,
    onChangeCoverHandler,
    changeTodolistTitleHandler} = useTodolistWithRedux(id, filter);

    const tasksForTodolist = sorterTasks.map((task) => {
        return (
            <Task key={task.id}
                  todolistId={id}
                  task={task}
            />
        )
    })

    return (
        <Grid xs={12} md={6} lg={4}>
            <Paper sx={{p: 2}}>
        <div className={styles.todolist}>
            <CoverImage image={coverImage && coverImage} updateImage={onChangeCoverHandler}/>
            <h3 style={{display: "flex", justifyContent: 'space-between'}}>
                <EditableSpan oldTitle={title} idToChange={id} updateItem={changeTodolistTitleHandler}/>
                <IconButton aria-label="delete" onClick={() => dispatch(removeTodolistAC(id))}>
                    <DeleteOutlineIcon/>
                </IconButton>
            </h3>

            <AddItem addItem={addItemHandler}/>
            <List sx={{width: '100%', height: 200, overflow: 'auto'}}>
                {
                    tasksForTodolist.length === 0 ? (
                        <p>Задач нет</p>
                    ) : (
                        tasksForTodolist
                    )
                }
            </List>

            <Grid container justifyContent="center">
                <Button size="small" onClick={() => {
                    onClickHandlerDeleteAllTasks()
                }}>Delete all</Button>
            </Grid>
            <FiltersForTasks filter={filter} filterCheck={onClickFilterHandlerCreator}/>
            {/*</Box>*/}
        </div>
            </Paper>
        </Grid>
    );
});


export default TodolistWithRedux;