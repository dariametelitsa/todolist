import React from 'react'
import '../App.scss'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { HeaderMenu } from '../components/headerMenu/HeaderMenu'
import { useAppWithRedux } from './hooks/useAppWithRedux'
import LinearProgress from '@mui/material/LinearProgress'
import AppBar from '@mui/material/AppBar'
import { ErrorSnackbar } from '../components/errorSnackbar/ErrorSnackbar'
import { Outlet } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'

function App() {
  const { theme, changeModeHandler, isLoading, isInitialized } = useAppWithRedux()

  if (!isInitialized)
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    )

  return (
    <div className={'App'}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1, mb: 12 }}>
          <AppBar position="fixed">
            <HeaderMenu changeModeHandler={changeModeHandler} />
            {isLoading && <LinearProgress color="success" />}
          </AppBar>
        </Box>
        <ErrorSnackbar />

        <Container fixed>
          {/*<TodolistList />*/}
          <Outlet />
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default App
