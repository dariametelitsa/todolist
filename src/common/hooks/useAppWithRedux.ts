import { useAppDispatch } from 'app/store';
import { useEffect, useState } from 'react';
import createTheme from '@mui/material/styles/createTheme';
import cyan from '@mui/material/colors/cyan';
import { selectAppIsInitialized, selectAppIsLogin, selectAppStatus, setIsLoggedIn } from 'app/model/appSlice';
import { useSelector } from 'react-redux';
import { useMeQuery } from 'features/auth/api/authAPI';
import { StatusCode } from 'common/enums';
// import { initializeApp, selectIsLoggedIn } from 'features/auth/model/authSlice';
// import { fetchTodolists } from 'features/todolistList/model/todolistsSlice';

type ThemeMode = 'dark' | 'light';

export const useAppWithRedux = () => {
  const dispatch = useAppDispatch();
  const status = useSelector(selectAppStatus);
  const isLoggedIn = useSelector(selectAppIsLogin);
  const { data, isLoading } = useMeQuery();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true);
      if (data?.resultCode === StatusCode.SUCCESS) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
      }
    }
  }, [dispatch, data?.resultCode, isLoading]);

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
