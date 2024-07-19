// @flow
import * as React from 'react'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import { MenuButton } from '../menuButton/MenuButton'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { logOutTC } from '../../features/login/thunk/loginThunk'

type HeaderMenuProps = {
  changeModeHandler: () => void
}

export const HeaderMenu = ({ changeModeHandler }: HeaderMenuProps) => {
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  const onClickLogoutHandler = () => {
    dispatch(logOutTC())
  }

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
  )
}
