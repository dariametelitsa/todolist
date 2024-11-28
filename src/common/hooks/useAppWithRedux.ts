import { useAppDispatch } from 'app/store';
import { useEffect, useState } from 'react';
import createTheme from '@mui/material/styles/createTheme';
import cyan from '@mui/material/colors/cyan';
import { selectAppIsInitialized, selectAppStatus } from 'app/model/appSlice';
import { useSelector } from 'react-redux';
import { initializeApp, selectIsLoggedIn } from 'features/auth/model/authSlice';
// import { fetchTodolists } from 'features/todolistList/model/todolistsSlice';

type ThemeMode = 'dark' | 'light';

export const useAppWithRedux = () => {
  const dispatch = useAppDispatch();
  const status = useSelector(selectAppStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isInitialized = useSelector(selectAppIsInitialized);
  const isLoading = status === 'loading';

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      // dispatch(fetchTodolists());
    }
  }, [isLoggedIn, dispatch]);

  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const changeModeHandler = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  const theme = createTheme({
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      ...(themeMode === 'light'
        ? { background: { default: '#ececec' } } // light mode background color
        : { background: { default: '#424242' } }), // dark mode background color
      primary: cyan,
    },
  });

  return {
    theme,
    changeModeHandler,
    isLoading,
    isLoggedIn,
    isInitialized,
  };
};
