import { useAppDispatch, useAppSelector } from '../store'
import { useCallback, useEffect, useState } from 'react'
import createTheme from '@mui/material/styles/createTheme'
import cyan from '@mui/material/colors/cyan'
import { addTodolistTC, getTodolistsTC } from '../../features/todolistList/thunk/todolistsThunks'
import { AppStatusTypes, selectAppIsInitialized, selectAppStatus } from '../reducers/appSlice'
import { meTC } from '../../features/login/thunk/loginThunk'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../features/login/reduser/authSlice'

type ThemeMode = 'dark' | 'light'

export const useAppWithRedux = () => {
  const dispatch = useAppDispatch()
  const status = useSelector(selectAppStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const isInitialized = useSelector(selectAppIsInitialized)
  const isLoading = status === 'loading'

  useEffect(() => {
    dispatch(meTC())
  }, [dispatch])

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getTodolistsTC())
    }
  }, [isLoggedIn, dispatch])

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
    isLoading,
    isLoggedIn,
    isInitialized,
  }
}
