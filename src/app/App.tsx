import React, { useCallback, useEffect, useState } from 'react'
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
import { useAppDispatch, useAppSelector } from './store'
import { AppStatusTypes } from './reducers/appSlice'
import { meTC } from '../features/login/thunk/thunk'
import { getTodolistsTC } from '../features/todolistList/thunk/todolistsThunks'
import createTheme from '@mui/material/styles/createTheme'
import cyan from '@mui/material/colors/cyan'

function App() {
  // type ThemeMode = 'dark' | 'light'
  // const dispatch = useAppDispatch()
  // const status = useAppSelector<AppStatusTypes>((state) => state.app.status)
  // const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)
  // const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)
  // const isLoading = status === 'loading'
  //
  // useEffect(() => {
  //   dispatch(meTC())
  // }, [dispatch])
  //
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     dispatch(getTodolistsTC())
  //   }
  // }, [isLoggedIn, dispatch])
  //
  // const [themeMode, setThemeMode] = useState<ThemeMode>('dark')
  // const changeModeHandler = () => {
  //   setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  // }
  //
  // const theme = createTheme({
  //   palette: {
  //     mode: themeMode === 'light' ? 'light' : 'dark',
  //     ...(themeMode === 'light'
  //       ? { background: { default: '#ececec' } } // light mode background color
  //       : { background: { default: '#424242' } }), // dark mode background color
  //     primary: cyan,
  //   },
  // })

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
