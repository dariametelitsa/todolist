// @flow
import * as React from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { MenuButton } from "../menuButton/MenuButton";
import AppBar from "@mui/material/AppBar";

type HeaderMenuProps = {
    changeModeHandler: () => void
};

export const HeaderMenu = ({changeModeHandler}: HeaderMenuProps) => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    News
                </Typography>
                <Switch color={'default'} onChange={changeModeHandler} />
                {/*<MenuButton color="inherit" background={'tomato'}>Login</MenuButton>*/}
                <MenuButton color="inherit" >Login</MenuButton>
                <MenuButton color="inherit">Logout</MenuButton>
                <MenuButton color="inherit">Faq</MenuButton>
            </Toolbar>
        </AppBar>
    );
};