import React, { useState } from "react";
import { FilterValuesType, TaskType, TodolistPropsType } from "../../data/dataPropsTypes";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import S from './Todolist.module.scss';

const Todolist: React.FC<TodolistPropsType> = ({
                                                   title,
                                                   tasks,
                                                   removeTask,
                                                   id,
                                                   addTask,
                                               }: TodolistPropsType) => {
    let [newTaskTitle, setNewTaskTitle] = useState('');

    //local state
    let [filter, setFilter] = useState<FilterValuesType>('all')

    const getTasksFotTodolist = (tasks: Array<TaskType>, filter: FilterValuesType) => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone);

            case 'completed':
                return tasks.filter(t => t.isDone);

            default:
                return tasks;
        }
    }

    const tasksForTodoList = getTasksFotTodolist(tasks, filter);

    //const inputRef = React.useRef<HTMLInputElement>(null)
    const onClickButtonHandler = () => {
        // if(inputRef.current) {
        //     const newTaskTitle = inputRef.current.value;
        //     addTask(newTaskTitle);
        //     inputRef.current.value = '';
        // }
        addTask(newTaskTitle);
        setNewTaskTitle('');
    }

    const onClickHandlerCreator = (filter: FilterValuesType) => {
        return () => setFilter(filter);
    }

    const onKeyDownHandler = () => {
        if (ifTaskCanAdded) {
            addTask(newTaskTitle);
            setNewTaskTitle('');
        }
    }

    const isTitleToLong = newTaskTitle.length > 15;
    const ifTaskCanAdded = newTaskTitle && !isTitleToLong;

    return (
        <div className={S.todolist}>
            <h3>{title}</h3>
            <div className={S.addTask}>
                {/*<input ref={inputRef} type="text" title={'hey'}/>*/}
                <Input changeTitle={setNewTaskTitle} title={newTaskTitle} onKeyDown={onKeyDownHandler}/>
                <Button title={'Add'} callBack={onClickButtonHandler} isDisabled={!ifTaskCanAdded}></Button>
                {
                    isTitleToLong && <div>too long</div>
                }
            </div>
            <ul>
                {
                    tasks.length === 0 ? (
                        <p>Задач нет</p>
                    ) : (
                        tasksForTodoList.map((task) => {
                            return (
                                <li key={id}><input type={"checkbox"} checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <Button title={'x'} callBack={() => removeTask(task.id)}/>
                                </li>
                            )
                        })
                    )
                }
            </ul>

            <div className={'tabs'}>
                <Button title={'All'} callBack={onClickHandlerCreator('all')}></Button>
                <Button title={'Active'} callBack={onClickHandlerCreator('active')}></Button>
                <Button title={'Completed'} callBack={onClickHandlerCreator('completed')}></Button>
            </div>
        </div>
    );
}


export default Todolist;