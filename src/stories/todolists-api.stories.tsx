import React, { useEffect, useState } from 'react'
import axios from "axios";
import { todolistAPI } from "../api/api";

export default {
    title: 'API',
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((response) => {
                console.log(response.data);
                setState(response.data);
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<any>('');
    const onClickHandler = () => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data);
            })
            .catch(err => {
                console.log(err)
                setState(null);
            })
    }
    return (
        <div>
            <input value={title} onChange={(e) =>setTitle(e.target.value)}/>
            <button onClick={onClickHandler} disabled={!title}>Add todolist</button>
            <p>{JSON.stringify(state)}</p>
        </div>
    )
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todoId, setTodoId] = useState<any>('');

    const onClickHandler = () => {
        todolistAPI.deleteTodolist(todoId)
            .then((res) => {
                setState(res.data);
            })
            .catch(err => {
                console.log(err)
                setState(null);
            })
    }

    return (
        <div>
            <input value={todoId} onChange={(e) => setTodoId(e.target.value)}/>
            <button onClick={onClickHandler} disabled={!todoId}>Delete todolist</button>
            <p>{JSON.stringify(state)}</p>
        </div>
    )
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<any>('');
    const [title, setTitle] = useState<any>('');

    const onClickHandler = () => {
        todolistAPI.updateTodolist(todoId, title)
            .then((res) => {
                setState(res.data);
            })
            .catch(err => {
                console.log(err)
                setState(null);
            })
    }

    return (
        <div>
            <input placeholder={'Id todo'} value={todoId} onChange={(e) => setTodoId(e.target.value)}/>
            <input placeholder={"Title todo"} value={title} onChange={(e) => setTitle(e.target.value)}/>
            <button onClick={onClickHandler} disabled={!todoId || !title}>Update todolist</button>
            <p>{JSON.stringify(state)}</p>
        </div>
    )
}