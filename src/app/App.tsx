import React from 'react'
import '../App.scss'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { HeaderMenu } from '../components/headerMenu/HeaderMenu'
import { useAppWithRedux } from './hooks/useAppWithRedux'
import { TodolistList } from '../features/todolistList/TodolistList'
import { LinearProgress } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import { ErrorSnackbar } from '../components/errorSnackbar/ErrorSnackbar'

function App() {
  const { theme, changeModeHandler, addTodolist, todoLists, isloading } = useAppWithRedux()

  return (
    <div className={'App'}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1, mb: 12 }}>
          <AppBar position="fixed">
            <HeaderMenu changeModeHandler={changeModeHandler} />
            {isloading && <LinearProgress />}
          </AppBar>
        </Box>
        <ErrorSnackbar />

        <Container fixed>
          <TodolistList todoLists={todoLists} addTodolist={addTodolist} />
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default App
