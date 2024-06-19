import React from 'react';
import '../App.scss'
import { AddItem } from "../components/addItem/AddItem";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import { HeaderMenu } from "../components/headerMenu/HeaderMenu";
import TodolistWithRedux from "../components/todolist/TodolistWithRedux";
import { useAppWithRedux } from "./hooks/useAppWithRedux";

function AppWithRedux() {
   const {theme,
       changeModeHandler,
       addTodolist,
       todoLists} = useAppWithRedux();

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




