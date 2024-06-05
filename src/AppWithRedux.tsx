import React, { useCallback, useState } from 'react';
import { TodoListType } from "./data/dataPropsTypes";
import './App.scss'
import { AddItem } from "./components/addItem/AddItem";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { cyan } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import { HeaderMenu } from "./components/headerMenu/HeaderMenu";
import { addedTodolistAC } from "./model/todolistsReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./model/store";
import TodolistWithRedux from "./components/todolist/TodolistWithRedux";

export const sum = (a: number, b: number): number => {
    return a + b;
}
type ThemeMode = 'dark' | 'light';


function AppWithRedux() {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists);

    const addTodolist = useCallback((title: string) => {
        const action  = addedTodolistAC(title);
        dispatch(action);
    },[dispatch]);


    const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
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
                            return (
                                <TodolistWithRedux todolist={td} key={td.id}/>
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




