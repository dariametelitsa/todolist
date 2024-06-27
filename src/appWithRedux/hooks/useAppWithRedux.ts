import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "../../model/store";
import { TodoListDomainType } from "../../data/dataPropsTypes";
import { useCallback, useEffect, useState } from "react";
import { addedTodolistAC, getTodolistsTC } from "../../model/todolistsReducer";
import { createTheme } from "@mui/material/styles";
import { cyan } from "@mui/material/colors";

type ThemeMode = 'dark' | 'light';

export const useAppWithRedux = () => {
    const dispatch = useAppDispatch();
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists);


    useEffect(()=>{
        dispatch(getTodolistsTC());
        //// it's wrong to do like this. Dialog with API not from view
        // todolistAPI.getTodolist()
        //     .then(res => {
        //         dispatch(setTodolistsAC(res.data));
        //         debugger
        //     })
        //     .catch((err) => {console.log('some error ' + err)})
    }, [dispatch])

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