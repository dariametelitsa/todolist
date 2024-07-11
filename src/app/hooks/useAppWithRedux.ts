import { useAppDispatch, useAppSelector } from '../store'
import { useCallback, useEffect, useState } from 'react'
import createTheme from '@mui/material/styles/createTheme'
import cyan from '@mui/material/colors/cyan'
import { addTodolistTC, getTodolistsTC } from '../../features/todolistList/thunk/todolistsThunks'
import { AppStatusTypes } from '../reducers/appReducer'
import { meTC } from '../../features/login/thunk/thunk'

type ThemeMode = 'dark' | 'light'

export const useAppWithRedux = () => {
  const dispatch = useAppDispatch()
  const todoLists = useAppSelector((state) => state.todolists)
  const status = useAppSelector<AppStatusTypes>((state) => state.app.status)
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)
  const isLoading = status === 'loading'

  useEffect(() => {
    dispatch(meTC())
  }, [dispatch])

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getTodolistsTC())
    }
  }, [dispatch, isLoggedIn])

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title))
    },
    [dispatch]
  )

  const [themeMode, setThemeMode] = useState<ThemeMode>('dark')
  const changeModeHandler = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  }

  const theme = createTheme({
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      ...(themeMode === 'light'
        ? { background: { default: '#ececec' } } // light mode background color
        : { background: { default: '#424242' } }), // dark mode background color
      primary: cyan,
    },
  })

  return {
    theme,
    changeModeHandler,
    addTodolist,
    todoLists,
    isLoading,
    isLoggedIn,
    isInitialized,
  }
}
