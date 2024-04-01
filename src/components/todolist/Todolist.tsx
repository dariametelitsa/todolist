import React, { useState } from "react";
import { TodolistPropsType } from "../../data/dataPropsTypes";
import { Button } from "../button/Button";
import { Input } from "../input/Input";

const Todolist: React.FC<TodolistPropsType> = ({
                                                   title,
                                                   tasks,
                                                   removeTask,
                                                   changeFilter,
                                                   id,
                                                   addTask
                                               }: TodolistPropsType) => {
    let [newTask, setNewTask] = useState('');

    const onClickButtonHandler = () => {
        addTask(id, newTask);
        setNewTask('');
    }

    return (
        <div className={'todolist'}>
            <h3>{title}</h3>
            <div className={'addTask'}>
                <Input changeTitle={setNewTask} title={newTask}/>
                <Button name={'Add'} callBack={onClickButtonHandler}></Button>
            </div>
            <ul>
                {
                    tasks.length === 0 ? (
                        <p>Задач нет</p>
                    ) : (
                        tasks.map((task, index) => {
                            return (
                                <li key={index}><input type={"checkbox"} checked={task.isDone}/>
                                    <span>{task.title}</span>

                                    <Button
                                        name={'x'}
                                        callBack={() => {
                                            removeTask(task.id)
                                        }}
                                    />
                                </li>
                            )
                        })
                    )
                }
            </ul>
            <div className={'tabs'}>
                <Button name={'All'} callBack={() => changeFilter('all')}></Button>
                <Button name={'Active'} callBack={() => changeFilter('active')}></Button>
                <Button name={'Completed'} callBack={() => changeFilter('completed')}></Button>
            </div>
        </div>
    );
}


export default Todolist;