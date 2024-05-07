import React, { useState } from 'react';
import { FilterValuesType, TasksType, TaskType, todoListType } from "./data/dataPropsTypes";
import { v1 } from "uuid";
import Todolist from "./components/todolist/Todolist";
import { tasksArr, todoListsData } from "./data/Data";
import './App.scss'
import { AddItem } from "./components/addItem/AddItem";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';

export const sum = (a: number, b: number): number => {
    return a + b;
}

function App() {


    const [todoLists, setTodoLists] = useState<Array<todoListType>>(todoListsData);
    const [tasks, setTasks] = useState<TasksType>(tasksArr); //how to type calculated property

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodoLists(todoLists.map(td => td.id !== todolistId ? td : {...td, filter}));
    }

    const filterTasks = (todolistId: string, tasks: TaskType[], filter: FilterValuesType) => {
        let tasksFiltered = tasks;
        let todolist = todoLists.find(td => td.id === todolistId);
        if (todolist && todolist.filter === 'active') {
            tasksFiltered = tasks.filter((t) => !t.isDone);
        }
        if (todolist && todolist.filter === 'completed') {
            tasksFiltered = tasks.filter((t) => t.isDone);
        }
        return tasksFiltered;
    }

    function removeTask(todolistId: string, taskId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)});
    }

    const addTask = (todolistId: string, taskTitle: string) => {
        let newTask = {id: v1(), isDone: false, title: taskTitle};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const renameTaskTitle = (todolistId: string, taskId: string, newTaskTitle: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTaskTitle} : t)
        });
    }

    const deleteAllTasks = (todolistId: string) => {
        setTasks({...tasks, [todolistId]: []});
    }

    const setNewTaskStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map((t) => t.id === taskId ? {...t, isDone: newIsDone} : t)
        });
    }

    const removeTodolist = (todolistId: string) => {
        setTodoLists([...todoLists.filter((t) => t.id !== todolistId)]);
        delete tasks[todolistId]; //delete unnecessary tasks
        setTasks({...tasks});
    }

    const addTodolist = (title: string) => {
        const newTodolistId = v1();
        const newTodolist: todoListType = {id: newTodolistId, title, filter: 'all'};
        setTodoLists([newTodolist, ...todoLists]);
        setTasks({...tasks, [newTodolistId]: []});
    }

    const updateTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodoLists(todoLists.map(td => td.id === todolistId ? {...td, title: newTitle} : td));
    }

    return (
        <div className={'App'}>

            <Box sx={{flexGrow: 1, mb: 12}}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>


            <Container fixed>

                <Grid container spacing={2} sx={{m: 0, mb:5}}>
                    <AddItem addItem={addTodolist}></AddItem>
                </Grid>

                <Grid container spacing={2}>
                    {todoLists.map(td => {
                        let tasksFiltered = filterTasks(td.id, tasks[td.id], td.filter);
                        return(
                            <Grid xs={6}>
                                <Paper sx={{p: 2}}>
                                <Todolist key={td.id}
                                          id={td.id}
                                          title={td.title}
                                          tasks={tasksFiltered}
                                          removeTask={removeTask}
                                          addTask={addTask}
                                          renameTaskTitle={renameTaskTitle}
                                          deleteAllTasks={deleteAllTasks}
                                          setNewTaskStatus={setNewTaskStatus}
                                          filter={td.filter}
                                          changeFilter={changeFilter}
                                          removeTodolist={removeTodolist}
                                          updateTodolistTitle={updateTodolistTitle}>
                                    {<div>Just do it!</div>}
                                </Todolist>
                                </Paper>
                            </Grid>
                        )
                    })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default App;




