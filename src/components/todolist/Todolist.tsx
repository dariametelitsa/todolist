import React, { ChangeEvent } from "react";
import { FilterValuesType, TodolistPropsType } from "../../data/dataPropsTypes";
import styles from './Todolist.module.scss';
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AddItem } from "../addItem/AddItem";
import { EditableSpan } from "../editableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

// Create
// Read for list (filter, type, sort, research, pagination)
// Update (status, title)
// Delete

const Todolist: React.FC<TodolistPropsType> = ({
                                                   children,
                                                   title,
                                                   tasks,
                                                   removeTask,
                                                   id,
                                                   filter,
                                                   renameTaskTitle,
                                                   changeFilter,
                                                   addTask,
                                                   deleteAllTasks,
                                                   setNewTaskStatus,
                                                   removeTodolist,
                                                   updateTodolistTitle
                                               }: TodolistPropsType) => {


    const [listRef] = useAutoAnimate<HTMLUListElement>()


    const onClickHandlerCreator = (filter: FilterValuesType) => {
        return () => changeFilter(id, filter);
    }

    const onClickHandlerDeleteAll = () => {
        deleteAllTasks(id);
    }

    const addItemHandler = (newItem: string) => {
        addTask(id, newItem);
    }

    const changeTodolistTitleHandler = (idToChange: string, newTitle: string) => {
        updateTodolistTitle(idToChange, newTitle);
    }

    const onChangeTitleTaskHandler = (idToChange: string, newTitle: string) => {
        renameTaskTitle(id, idToChange, newTitle);
    }

    return (
        <div className={styles.todolist}>
            <h3>
                <EditableSpan oldTitle={title} idToChange={id} updateItem={changeTodolistTitleHandler}/>
                <IconButton aria-label="delete" onClick={() => removeTodolist(id)}>
                    <DeleteOutlineIcon />
                </IconButton>
            </h3>

            <AddItem addItem={addItemHandler}/>
            <ul ref={listRef}>
                {
                    tasks.length === 0 ? (
                        <p>Задач нет</p>
                    ) : (
                        tasks.map((task) => {
                            const onChangeSetTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskStatus(id, task.id, e.currentTarget.checked);
                            return (
                                <li key={task.id} className={task.isDone ? styles.taskDone : styles.task}>
                                    <input type={"checkbox"} checked={task.isDone}
                                           onChange={onChangeSetTaskStatusHandler}/>
                                    {/*<span className={task.isDone ? styles.taskDone : styles.task}>{task.title}</span>*/}
                                    <EditableSpan oldTitle={task.title} idToChange={task.id} updateItem={onChangeTitleTaskHandler}/>
                                    <IconButton aria-label="delete" onClick={() => removeTask(id, task.id)}>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                    {/*<Button title={'x'} callBack={() => removeTask(id, task.id)}/>*/}
                                </li>
                            )
                        })
                    )
                }
            </ul>
            {/*todo*/}
            {/*<Button title={'Delete all tasks'}*/}
            {/*        callBack={() => {*/}
            {/*            onClickHandlerDeleteAll()*/}
            {/*        }}*/}
            {/*        isDisabled={tasks.length === 0}/>*/}
            <Button onClick={() => {onClickHandlerDeleteAll()}} variant="contained" color='info' startIcon={<DeleteIcon />}>
                Delete
            </Button>

            <div className={'tabs'}>
                {/*<Button active={filter === 'all'} title={'All'}*/}
                {/*        callBack={onClickHandlerCreator('all')}></Button>*/}
                {/*<Button active={filter === 'active'} title={'Active'}*/}
                {/*        callBack={onClickHandlerCreator('active')}></Button>*/}
                {/*<Button active={filter === 'completed'} title={'Completed'}*/}
                {/*        callBack={onClickHandlerCreator('completed')}></Button>*/}

                <Button color={'secondary'} variant={filter === 'all' ? "contained" : 'outlined'} onClick={onClickHandlerCreator('all')}>All</Button>
                <Button color='primary' variant={filter === 'active' ? "contained" : 'outlined'} onClick={onClickHandlerCreator('active')}>Active</Button>
                <Button color='success' variant={filter === 'completed' ? "contained" : 'outlined'} onClick={onClickHandlerCreator('completed')}>completed</Button>
            </div>
            {children}
        </div>
    );
}


export default Todolist;