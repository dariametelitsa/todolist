import React, { ChangeEvent } from "react";
import { FilterValuesType, TodolistPropsType } from "../../data/dataPropsTypes";
import { Button } from "../button/Button";
import styles from './Todolist.module.scss';
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AddItem } from "../addItem/AddItem";
import { EditableSpan } from "../editableSpan/EditableSpan";

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
                                                   changeTodolistTitle
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

    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(id, newTitle);
    }

    return (
        <div className={styles.todolist}>
            <h3>
                <EditableSpan oldTitle={title} updateItem={changeTodolistTitleHandler}/>
                {/*{title} */}
                <Button title={'x'} callBack={() => removeTodolist(id)}/>
            </h3>

            <AddItem addItem={addItemHandler}/>
            <ul ref={listRef}>
                {
                    tasks.length === 0 ? (
                        <p>Задач нет</p>
                    ) : (
                        tasks.map((task) => {
                            const onChangeSetTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskStatus(id, task.id, e.currentTarget.checked);
                            const onChangeTitleTaskHandler = (newTitle: string) => {
                                renameTaskTitle(id, task.id, newTitle);
                            }
                            return (
                                <li key={id} className={task.isDone ? styles.taskDone : styles.task}>
                                    <input type={"checkbox"} checked={task.isDone}
                                           onChange={onChangeSetTaskStatusHandler}/>
                                    {/*<span className={task.isDone ? styles.taskDone : styles.task}>{task.title}</span>*/}
                                    <EditableSpan oldTitle={task.title} updateItem={onChangeTitleTaskHandler}/>
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