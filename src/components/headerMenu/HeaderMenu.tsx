// @flow
import * as React from 'react'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import { MenuButton } from '../menuButton/MenuButton'
import { Link } from 'react-router-dom'
import { PATH } from '../../routes/PATH'

type HeaderMenuProps = {
  changeModeHandler: () => void
}

export const HeaderMenu = ({ changeModeHandler }: HeaderMenuProps) => {
  return (
    <Toolbar>
      <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        News
      </Typography>
      <Switch color={'default'} onChange={changeModeHandler} />
      <Link to={PATH.TODOLISTS}>
        <MenuButton color="inherit">Todolists</MenuButton>
      </Link>
      <Link to={PATH.LOGIN}>
        <MenuButton color="inherit">Login/Logout</MenuButton>
      </Link>
      <MenuButton color="inherit">Faq</MenuButton>
    </Toolbar>
  )
}
