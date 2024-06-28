// trouble with reducer (task add)

import React, { useReducer, useState } from 'react';
import { FilterValuesType } from "../../../data/dataPropsTypes";
import Todolist from '../todolist/Todolist';
import { tasksArr, todoListsData } from "../../../data/Data";
import '../App.scss'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { cyan } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import { HeaderMenu } from  '../../headerMenu/HeaderMenu';
        //"../../components/headerMenu/HeaderMenu";
import {
    addTodolistAC,
    changedTodolistCoverAC,
    changedTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    todolistsReducer
} from "../../../model/redusers/todolistsReducer";
import { cleanTasksListAC, deleteTaskAC, tasksReducer } from "../../../model/redusers/tasksReduser";
import { TaskStatuses, TaskType, TodolistType } from "../../../api/todolist-api";
import { AddItem } from "../../addItem/AddItem";

export const sum = (a: number, b: number): number => {
    return a + b;
}
type ThemeMode = 'dark' | 'light';


function App() {
    const [todoLists, dispatchTodoLists] = useReducer(todolistsReducer, todoListsData);
    const [tasks, dispatchTasks] = useReducer(tasksReducer, tasksArr);

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatchTodoLists(changedTodolistFilterAC(todolistId, filter));
    };

    const changeTodoCover = (todolistId: string, coverImage: string) => {
        dispatchTodoLists(changedTodolistCoverAC(todolistId, coverImage));
    };

    const filterTasks = (todolistId: string, tasks: TaskType[]) => {
        let tasksFiltered = tasks;
        let todolist = todoLists.find(td => td.id === todolistId);
        if (todolist && todolist.filter === 'active') {
            tasksFiltered = tasks.filter((t) => t.status !== TaskStatuses.Completed);
        }
        if (todolist && todolist.filter === 'completed') {
            tasksFiltered = tasks.filter((t) => t.status === TaskStatuses.Completed);
        }
        return tasksFiltered;
    };

    function removeTask(todolistId: string, taskId: string) {
        dispatchTasks(deleteTaskAC(todolistId, taskId));
    }

    const addTask = (todolistId: string, taskTitle: string) => {
        //dispatchTasks(addTaskAC(todolistId, taskTitle));
    };

    const renameTaskTitle = (todolistId: string, taskId: string, newTaskTitle: string) => {
        //dispatchTasks(updateTaskTC(todolistId, taskId, newTaskTitle));
    };

    const deleteAllTasks = (todolistId: string) => {
        dispatchTasks(cleanTasksListAC(todolistId));
    };

    const setNewTaskStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
        //dispatchTasks(setNewTaskStatusAC(todolistId, taskId, newIsDone));
    };

    const removeTodolist = (todolistId: string) => {
        const action = deleteTodolistAC(todolistId);
        dispatchTodoLists(action);
        dispatchTasks(action);
    };

    const addTodolist = (title: string) => {
        const todo: TodolistType = {id:'test', title, order: 0, addedDate: ''};
        const action = addTodolistAC(todo);
        dispatchTodoLists(action);
        dispatchTasks(action);
    };

    const updateTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatchTodoLists(changeTodolistTitleAC(todolistId, newTitle));
    };

    const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    };
    // const theme = createTheme({
    //     palette: {
    //         mode: themeMode==='light' ? 'light' : 'dark',
    //         primary: {
    //             main: '#4aee08',
    //             contrastText: 'white',
    //         },
    //         secondary: {
    //             light: '#757ce8',
    //             main: '#3f50b5',
    //             dark: '#002884',
    //             contrastText: '#fff',
    //         },
    //     },
    // })
    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            ...(themeMode === 'light'
                ? {background: {default: "#ececec"}} // light mode background color
                : {background: {default: "#424242"}}), // dark mode background color
            primary: cyan,
        },
    });


    return (
        <div className={'App'}>

            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box sx={{flexGrow: 1, mb: 12}}>
                    <HeaderMenu changeModeHandler={changeModeHandler}/>
                </Box>

                <Container fixed>
                    <Grid container spacing={2} sx={{m: 0, mb: 5}}>
                        <AddItem addItem={addTodolist}></AddItem>
                    </Grid>

                    <Grid container spacing={3}>
                        {todoLists.map(td => {
                            let tasksFiltered = filterTasks(td.id, tasks[td.id]);
                            //let tasksFilteredSorted = sorterTasks(td.id, filterTasks(td.id, tasks[td.id]));
                            return (
                                <Grid xs={4} key={td.id}>
                                    <Paper sx={{p: 2}}>
                                        <Todolist key={td.id}
                                                  id={td.id}
                                                  title={td.title}
                                                  tasks={tasksFiltered}
                                                  coverImage={td.coverImage}
                                                  removeTask={removeTask}
                                                  addTask={addTask}
                                                  renameTaskTitle={renameTaskTitle}
                                                  deleteAllTasks={deleteAllTasks}
                                                  setNewTaskStatus={setNewTaskStatus}
                                                  filter={td.filter}
                                                  changeFilter={changeFilter}
                                                  removeTodolist={removeTodolist}
                                                  updateTodolistTitle={updateTodolistTitle}
                                                  changeTodoCover={changeTodoCover}>
                                        </Todolist>
                                    </Paper>
                                </Grid>
                            )
                        })
                        }
                    </Grid>
                </Container>
            </ThemeProvider>

            {/*<ThemeProvider theme={customTheme}>*/}
            {/*    <div>Styled div with theme</div>*/}
            {/*    <MenuButton color="inherit">Faq</MenuButton>*/}
            {/*</ThemeProvider>*/}
        </div>
    );
}

export default App;




