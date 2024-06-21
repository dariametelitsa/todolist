import React, { useEffect, useState } from 'react'
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
            <input placeholder={'Todolist ID'} value={todoId} onChange={(e) => setTodoId(e.target.value)}/>
            <input placeholder={"Title"} value={title} onChange={(e) => setTitle(e.target.value)}/>
            <button onClick={onClickHandler} disabled={!todoId || !title}>Update todolist</button>
            <p>{JSON.stringify(state)}</p>
        </div>
    )
}

export const GetTasksForTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todoId, setTodoId] = useState<any>('');

    const onClickHandler = () => {
        todolistAPI.getTasks(todoId)
            .then(res => {
                setState(res.data);
            })
    }

    return (
        <div>
            <input placeholder={'ID todo'} value={todoId} onChange={(e) => setTodoId(e.target.value)}/>
            <button onClick={onClickHandler} disabled={!todoId}>Get tasks</button>
            <p>{JSON.stringify(state)}</p>
        </div>
    )
}

export const CreateTaskForTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todoId, setTodoId] = useState<any>('');
    const [title, setTitle] = useState<any>('');

    const onClickHandler = () => {
        todolistAPI.createTask(todoId, title)
            .then(res => {
                setState(res.data);
        })
    }
    //fee254ae-3d15-4d96-8c84-fbbeb554608c
    //181c8020-5928-482a-bb12-3565aacb9498
    return (
        <div>
            <input placeholder={'ID todo'} value={todoId} onChange={(e) => setTodoId(e.target.value)}/>
            <input placeholder={'title'} value={title} onChange={(e) => setTitle(e.target.value)}/>
            <button onClick={onClickHandler} disabled={!title || !todoId}>Add task</button>
            <p>{JSON.stringify(state)}</p>
        </div>
    )
}

export const DeleteTaskForTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todoId, setTodoId] = useState<any>('');
    const [taskId, setTaskId] = useState<any>('');

    const onClickHandler = () => {
        todolistAPI.deleteTask(todoId, taskId)
            .then(res => {
                setState(res.data);
            })
    }

    return (
        <div>
            <input placeholder={'todolist ID'} value={todoId} onChange={(e) => setTodoId(e.target.value)}/>
            <input placeholder={'task ID'} value={taskId} onChange={(e) => setTaskId(e.target.value)}/>
            <button onClick={onClickHandler} disabled={!todoId || !taskId}>Delete task</button>
            <p>{JSON.stringify(state)}</p>
        </div>
    )
}

export const UpdateTaskForTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<any>('');
    const [taskId, setTaskId] = useState<any>('');
    const [title, setTitle] = useState<any>('');

    const onClickHandler = () => {
        todolistAPI.updateTask(todoId, taskId, title)
            .then(res => {
                setState(res.data)
            })
    }

    return (
        <div>
            <input placeholder={'todolist ID'} value={todoId} onChange={(e) => setTodoId(e.target.value)}/>
            <input placeholder={'task ID'} value={taskId} onChange={(e) => setTaskId(e.target.value)}/>
            <input placeholder={"Title todo"} value={title} onChange={(e) => setTitle(e.target.value)}/>
            <button onClick={onClickHandler} disabled={!todoId || !title || !taskId}>Update todolist</button>
            <p>{JSON.stringify(state)}</p>
        </div>
    )
}
