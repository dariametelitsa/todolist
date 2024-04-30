import React, { ChangeEvent } from "react";
import { FilterValuesType, TodolistPropsType } from "../../data/dataPropsTypes";
import { Button } from "../button/Button";
import styles from './Todolist.module.scss';
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AddItem } from "../addItem/AddItem";

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
                                                   changeFilter,
                                                   addTask,
                                                   deleteAllTasks,
                                                   setNewTaskStatus,
                                                   removeTodolist,
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

    return (
        <div className={styles.todolist}>
            <h3>{title} <Button title={'x'} callBack={() => removeTodolist(id)}/></h3>

            <AddItem addItem={addItemHandler}/>
            <ul ref={listRef}>
                {
                    tasks.length === 0 ? (
                        <p>Задач нет</p>
                    ) : (
                        tasks.map((task) => {
                            const onChangeSetTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskStatus(id, task.id, e.currentTarget.checked);
                            return (
                                <li key={id}>
                                    <input type={"checkbox"} checked={task.isDone}
                                           onChange={onChangeSetTaskStatusHandler}/>
                                    <span className={task.isDone ? styles.taskDone : styles.task}>{task.title}</span>
                                    <Button title={'x'} callBack={() => removeTask(id, task.id)}/>
                                </li>
                            )
                        })
                    )
                }
            </ul>
            <Button title={'Delete all tasks'}
                    callBack={() => {
                        onClickHandlerDeleteAll()
                    }}
                    isDisabled={tasks.length === 0}/>
            <div className={'tabs'}>
                <Button active={filter === 'all'} title={'All'}
                        callBack={onClickHandlerCreator('all')}></Button>
                <Button active={filter === 'active'} title={'Active'}
                        callBack={onClickHandlerCreator('active')}></Button>
                <Button active={filter === 'completed'} title={'Completed'}
                        callBack={onClickHandlerCreator('completed')}></Button>
            </div>
            {children}
        </div>
    );
}


export default Todolist;