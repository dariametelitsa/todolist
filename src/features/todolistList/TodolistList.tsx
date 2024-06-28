import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { AddItem } from "../../components/addItem/AddItem";
import Todolist from "./todolist/Todolist";
import { TodoListDomainType } from "../../data/dataPropsTypes";

type TodolistListProps = {
    todoLists: TodoListDomainType[]
    addTodolist: (title: string) => void
};
export const TodolistList: React.FC<TodolistListProps> = ({todoLists, addTodolist}) => {
    return (
        <>
            <Grid container spacing={2} sx={{m: 0, mb: 5}}>
                <AddItem addItem={addTodolist}></AddItem>
            </Grid>

            <Grid container spacing={3}>
                {todoLists.map(td => {
                    return (
                        <Todolist todolist={td} key={td.id}/>
                    )
                })
                }
            </Grid>
        </>
    );
};