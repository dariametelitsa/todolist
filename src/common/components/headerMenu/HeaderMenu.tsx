// @flow
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { MenuButton } from '../menuButton/MenuButton';
import { useAppDispatch } from 'app/store';
import { logOut, selectIsLoggedIn } from 'features/auth/model/authSlice';
import { useSelector } from 'react-redux';

type Props = {
  changeModeHandler: () => void;
};

export const HeaderMenu = ({ changeModeHandler }: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const onClickLogoutHandler = () => {
    dispatch(logOut());
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
