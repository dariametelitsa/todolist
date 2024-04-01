import React, { useState } from "react";
import { FilterValuesType, TaskType, TodolistPropsType } from "../../data/dataPropsTypes";
import { Button } from "../button/Button";
import { Input } from "../input/Input";

const Todolist: React.FC<TodolistPropsType> = ({
                                                   title,
                                                   tasks,
                                                   removeTask,
                                                   id,
                                                   addTask
                                               }: TodolistPropsType) => {
    let [newTask, setNewTask] = useState('');

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
                        tasksForTodoList.map((task, index) => {
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
                <Button name={'All'} callBack={() => setFilter('all')}></Button>
                <Button name={'Active'} callBack={() => setFilter('active')}></Button>
                <Button name={'Completed'} callBack={() => setFilter('completed')}></Button>
            </div>
        </div>
    );
}


export default Todolist;