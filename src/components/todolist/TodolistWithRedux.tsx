import React, { useCallback, useMemo } from "react";
import { FilterValuesType, TaskType, TodoListType } from "../../data/dataPropsTypes";
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
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../../model/store";
import {
    addTaskAC,
    cleanTasksListAC,
    removeTaskAC,
    renameTaskTitleAC,
    setNewTaskStatusAC
} from "../../model/tasksReduser";
import {
    changedTodolistCoverAC,
    changedTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../../model/todolistsReducer";
import { ButtonMemo } from "../button/ButtonMemo";
import { Tasks } from "../tasks/Tasks";


// Create
// Read for list (filter, type, sort, research, pagination)
// Update (status, title)
// Delete
type Props = {
    todolist: TodoListType
}
const TodolistWithRedux = React.memo(({todolist}: Props) => {
    const {id, title, filter, coverImage} = todolist;

    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[id]);
    const dispatch = useDispatch();

    // const filterTasks = (tasks: TaskType[]) => {
    //     let tasksFiltered = tasks;
    //     if (filter === 'active') {
    //         tasksFiltered = tasks.filter((t) => !t.isDone);
    //     }
    //     if (filter === 'completed') {
    //         tasksFiltered = tasks.filter((t) => t.isDone);
    //     }
    //     return tasksFiltered;
    // };
    //
    // const filteredTasks = useMemo(() => filterTasks(tasks),[tasks, filter]);
    // //const filteredTasks = filterTasks(tasks);
    const filteredTasks = useMemo(() => {
        if (filter === 'active') {
            return tasks.filter((t) => !t.isDone);
        }
        if (filter === 'completed') {
            return tasks.filter((t) => t.isDone);
        }
        return tasks;
    }, [tasks, filter]);

    const onClickFilterHandlerCreator = useCallback((filter: FilterValuesType) => {
        return () => dispatch(changedTodolistFilterAC(id, filter));
    }, [dispatch]);

    const onClickHandlerDeleteAllTasks = useCallback(() => {
        dispatch(cleanTasksListAC(id))
    }, [dispatch]);

    const addItemHandler = useCallback((title: string) => {
        dispatch(addTaskAC(id, title));
    }, [dispatch]);

    const onChangeCoverHandler = useCallback((image: string) => {
        dispatch(changedTodolistCoverAC(id, image));
    },[dispatch]);

    const changeTodolistTitleHandler = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle));
    },[dispatch]);

    const onChangeTitleTaskHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(renameTaskTitleAC(id, taskId, newTitle));
    }, [dispatch]);

    const onChangeSetTaskStatusHandler = useCallback((taskId: string, newStatus: boolean) => {
        dispatch(setNewTaskStatusAC(id, taskId, newStatus));
    }, [dispatch]);

    const deleteTaskHandler = useCallback((taskId: string) => {
        dispatch(removeTaskAC(id, taskId));
    }, [dispatch]);


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
                    filteredTasks.length === 0 ? (
                        <p>Задач нет</p>
                    ) : (
                        filteredTasks.map((task) => {
                            return (
                                <Tasks key={task.id}
                                       task={task}
                                       changeTaskStatus={onChangeSetTaskStatusHandler}
                                       changeTaskTitle={onChangeTitleTaskHandler}
                                       removeTask={deleteTaskHandler}
                                       todolistId={id} />
                                // <ListItem key={task.id}
                                //           sx={getListItemSx(task.isDone)}>
                                //
                                //
                                //     <label className={styles.label}>
                                //         <Checkbox checked={task.isDone} onChange={(e) => onChangeSetTaskStatusHandler(task.id, e.currentTarget.checked)}/>
                                //         <EditableSpan oldTitle={task.title} idToChange={task.id}
                                //                       updateItem={onChangeTitleTaskHandler}/>
                                //     </label>
                                //     <IconButton aria-label="delete" onClick={() => dispatch(removeTaskAC(id, task.id))}>
                                //         <DeleteOutlineIcon/>
                                //     </IconButton>
                                // </ListItem>
                            )
                        })
                    )
                }
            </List>

            <Grid container justifyContent="center">
                <Button size="small" onClick={() => {
                    onClickHandlerDeleteAllTasks()
                }}>Delete all</Button>
            </Grid>

            <Box sx={filterButtonsContainerSx}>
                <ButtonMemo color={'secondary'} variant={filter === 'all' ? "contained" : 'outlined'}
                        onClick={onClickFilterHandlerCreator('all')}>All</ButtonMemo>
                <ButtonMemo color='primary' variant={filter === 'active' ? "contained" : 'outlined'}
                        onClick={onClickFilterHandlerCreator('active')}>Active</ButtonMemo>
                <ButtonMemo color='success' variant={filter === 'completed' ? "contained" : 'outlined'}
                        onClick={onClickFilterHandlerCreator('completed')}>completed</ButtonMemo>
            </Box>
        </div>
            </Paper>
        </Grid>
    );
});


export default TodolistWithRedux;