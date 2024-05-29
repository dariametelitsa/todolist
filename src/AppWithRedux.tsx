import React, { useReducer, useState } from 'react';
import { FilterValuesType, TasksArrPropsType, TasksType, TaskType, TodoListType } from "./data/dataPropsTypes";
import Todolist from "./components/todolist/Todolist";
import './App.scss'
import { AddItem } from "./components/addItem/AddItem";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { cyan } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import { HeaderMenu } from "./components/headerMenu/HeaderMenu";
import {
    addedTodolistAC,
    changedTodolistCoverAC,
    changedTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./model/todolistsReducer";
import {
    addTaskAC,
    cleanTasksListAC,
    removeTaskAC,
    renameTaskTitleAC,
    setNewTaskStatusAC,
    tasksReducer
} from "./model/tasksReduser";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./model/store";

export const sum = (a: number, b: number): number => {
    return a + b;
}
type ThemeMode = 'dark' | 'light';


function AppWithRedux() {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists);
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasks);

    //const [todoLists, dispatchTodoLists] = useReducer(todolistsReducer, todoListsData);
    //const [tasks, dispatchTasks] = useReducer(tasksReducer, tasksArr);

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatch(changedTodolistFilterAC(todolistId, filter));
    };

    const changeTodoCover = (todolistId: string, coverImage: string) => {
        dispatch(changedTodolistCoverAC(todolistId, coverImage));
    };

    const filterTasks = (todolistId: string, tasks: TaskType[]) => {
        let tasksFiltered = tasks;
        let todolist = todoLists.find(td => td.id === todolistId);
        if (todolist && todolist.filter === 'active') {
            tasksFiltered = tasks.filter((t) => !t.isDone);
        }
        if (todolist && todolist.filter === 'completed') {
            tasksFiltered = tasks.filter((t) => t.isDone);
        }
        return tasksFiltered;
    };

    function removeTask(todolistId: string, taskId: string) {
        dispatch(removeTaskAC(todolistId, taskId));
    }

    const addTask = (todolistId: string, taskTitle: string) => {
        dispatch(addTaskAC(todolistId, taskTitle));
    };

    const renameTaskTitle = (todolistId: string, taskId: string, newTaskTitle: string) => {
        dispatch(renameTaskTitleAC(todolistId, taskId, newTaskTitle));
    };

    const deleteAllTasks = (todolistId: string) => {
        dispatch(cleanTasksListAC(todolistId));
    };

    const setNewTaskStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
        dispatch(setNewTaskStatusAC(todolistId, taskId, newIsDone));
    };

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId);
        dispatch(action);
    };

    const addTodolist = (title: string) => {
        const action  = addedTodolistAC(title);
        dispatch(action);
    };

    const updateTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle));
    };

    const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    };

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            ...(themeMode === 'light'
                ? { background: { default: "#ececec" } } // light mode background color
                : { background: { default: "#424242" } }), // dark mode background color
            primary: cyan,
        },
    });


    return (
        <div className={'App'}>

            <ThemeProvider theme={theme}>
                <CssBaseline />
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

export default AppWithRedux;




