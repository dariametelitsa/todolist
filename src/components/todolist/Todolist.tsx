import React from "react";
import { FilterValuesType, TasksType, TaskType, TodolistPropsType } from "../../data/dataPropsTypes";
import styles from './Todolist.module.scss';
import { AddItem } from "../addItem/AddItem";
import { EditableSpan } from "../editableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Box from '@mui/material/Box';
import { filterButtonsContainerSx, getListItemSx } from "./Todolist.styles";
import { CoverImage } from "../coverImage/CoverImage";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../../model/store";
import {
    addTaskAC,
    cleanTasksListAC,
    removeTaskAC,
    renameTaskTitleAC,
    setNewTaskStatusAC
} from "../../model/tasksReduser";


// Create
// Read for list (filter, type, sort, research, pagination)
// Update (status, title)
// Delete

const Todolist: React.FC<TodolistPropsType> = ({
                                                   id,
                                                   title,
                                                   filter,
                                                   changeFilter,
                                                   removeTodolist,
                                                   updateTodolistTitle,
                                                   coverImage,
                                                   changeTodoCover
                                               }: TodolistPropsType) => {

    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, TaskType[]>(store => store.tasks[id]);

    const filterTasks = (tasks: TaskType[]): TaskType[] => {
        let tasksFiltered = tasks;
        if (filter === 'active') {
            tasksFiltered = tasks.filter((t) => !t.isDone);
        }
        if (filter === 'completed') {
            tasksFiltered = tasks.filter((t) => t.isDone);
        }
        return tasksFiltered;
    };

    let filteredTasks: TaskType[] = filterTasks(tasks);

    const onClickHandlerCreator = (filter: FilterValuesType) => {
        return () => changeFilter(id, filter);
    }

    const onClickHandlerDeleteAllTasks = () => {
        dispatch(cleanTasksListAC(id));
    }

    const addItemHandler = (taskTitle: string) => {
        dispatch(addTaskAC(id, taskTitle));
    }

    const onChangeCoverHandler = (image: string) => {
        changeTodoCover(id, image);
    }

    const changeTodolistTitleHandler = (idToChange: string, newTitle: string) => {
        updateTodolistTitle(idToChange, newTitle);
    }

    const onChangeTitleTaskHandler = (taskId: string, newTitle: string) => {
        dispatch(renameTaskTitleAC(id, taskId, newTitle));
    }

    const onChangeSetTaskStatusHandler = (taskId: string, newIsDone: boolean) => {
        dispatch(setNewTaskStatusAC(id, taskId, newIsDone));
    }

    return (
        <div className={styles.todolist}>
            <CoverImage image={coverImage && coverImage} updateImage={onChangeCoverHandler}/>
            <h3>
                <EditableSpan oldTitle={title} idToChange={id} updateItem={changeTodolistTitleHandler}/>
                <IconButton aria-label="delete" onClick={() => removeTodolist(id)}>
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
                                <ListItem key={task.id}
                                          sx={getListItemSx(task.isDone)}>

                                    <label className={styles.label}>
                                        <Checkbox checked={task.isDone}
                                                  onChange={(e) => onChangeSetTaskStatusHandler(task.id, e.currentTarget.checked)}/>
                                        <EditableSpan oldTitle={task.title} idToChange={task.id}
                                                      updateItem={onChangeTitleTaskHandler}/>
                                    </label>
                                    <IconButton aria-label="delete" onClick={() => dispatch(removeTaskAC(id, task.id))}>
                                        <DeleteOutlineIcon/>
                                    </IconButton>
                                </ListItem>
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
                <Button color={'secondary'} variant={filter === 'all' ? "contained" : 'outlined'}
                        onClick={onClickHandlerCreator('all')}>All</Button>
                <Button color='primary' variant={filter === 'active' ? "contained" : 'outlined'}
                        onClick={onClickHandlerCreator('active')}>Active</Button>
                <Button color='success' variant={filter === 'completed' ? "contained" : 'outlined'}
                        onClick={onClickHandlerCreator('completed')}>completed</Button>
            </Box>
        </div>
    );
}


export default Todolist;