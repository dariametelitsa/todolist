import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "../../model/store";
import { TodoListDomainType } from "../../data/dataPropsTypes";
import { useCallback, useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";
import { cyan } from "@mui/material/colors";
import { addTodolistTC, getTodolistsTC } from "../../model/thunk/todolistsThunks";

type ThemeMode = 'dark' | 'light';

export const useAppWithRedux = () => {
    const dispatch = useAppDispatch();
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists);


    useEffect(()=>{
        dispatch(getTodolistsTC());
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    },[dispatch]);


    const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    };

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            ...(themeMode === 'light'
                ? { background: { default: "#ececec" } } // light mode background color
                : { background: { default: "#424242" } }), // dark mode background color
            primary: cyan,
        },
    });

    return {
        theme,
        changeModeHandler,
        addTodolist,
        todoLists,
    };
}