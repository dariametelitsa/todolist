import React from 'react';
import '../App.scss'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import { HeaderMenu } from "../components/headerMenu/HeaderMenu";
import { useAppWithRedux } from "./hooks/useAppWithRedux";
import { TodolistList } from "../features/todolistList/TodolistList";

function App() {
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
                   <TodolistList todoLists={todoLists} addTodolist={addTodolist}/>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default App;




