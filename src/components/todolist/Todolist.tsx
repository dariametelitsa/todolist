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
    let [task, setTask] = useState('');

    const onClickButtonHandler = () => {
        addTask(id, task);
        setTask('');
    }

    return (
        <div className={'todolist'}>
            <h3>{title}</h3>
            <div className={'addTask'}>
                <Input changeTitle={setTask} title={task}/>
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
                <button onClick={() => {
                    changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    changeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>
    );
}


export default Todolist;