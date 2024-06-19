import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../../model/store";
import { TodoListType } from "../../data/dataPropsTypes";
import { useCallback, useState } from "react";
import { addedTodolistAC } from "../../model/todolistsReducer";
import { createTheme } from "@mui/material/styles";
import { cyan } from "@mui/material/colors";

type ThemeMode = 'dark' | 'light';

export const useAppWithRedux = () => {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists);

    const addTodolist = useCallback((title: string) => {
        const action  = addedTodolistAC(title);
        dispatch(action);
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