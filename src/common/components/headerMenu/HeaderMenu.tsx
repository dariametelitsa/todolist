// @flow
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { MenuButton } from '../menuButton/MenuButton';
import { useAppDispatch } from 'app/store';
// import { logOut, selectIsLoggedIn } from 'features/auth/model/authSlice';
import { useSelector } from 'react-redux';
import { useLogoutMutation } from 'features/auth/api/authAPI';
import { selectAppIsLogin, setIsLoggedIn } from 'app/model/appSlice';
import { StatusCode } from 'common/enums';

type Props = {
  changeModeHandler: () => void;
};

export const HeaderMenu = ({ changeModeHandler }: Props) => {
  const isLoggedIn = useSelector(selectAppIsLogin);
  const [logOut] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const onClickLogoutHandler = () => {
    logOut()
      .unwrap()
      .then((res) => {
        if (res.resultCode === StatusCode.SUCCESS) {
          dispatch(setIsLoggedIn({ isLoggedIn: false }));
          localStorage.removeItem('sn-token');
          //todo
          // dispatch(clearTasks())
          // dispatch(clearTodolists())
        }
      });
  };

  return (
    <Toolbar>
      <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        News
      </Typography>
      <Switch color={'default'} onChange={changeModeHandler} />
      {isLoggedIn && (
        <MenuButton onClick={onClickLogoutHandler} color="inherit">
          Logout
        </MenuButton>
      )}
      <MenuButton color="inherit">Faq</MenuButton>
    </Toolbar>
  );
};
