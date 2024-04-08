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
    let [newTaskTitle, setNewTaskTitle] = useState('');

    //local state
    let [filter, setFilter] = useState<FilterValuesType>('all')

    const onClickHandlerCreator = (filter: FilterValuesType) => {
        return () => setFilter(filter);
    }

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

    const inputRef = React.useRef<HTMLInputElement>(null)
    const onClickButtonHandler = () => {
        // addTask(newTaskTitle);
        if(inputRef.current) {
            const newTaskTitle = inputRef.current.value;
            addTask(newTaskTitle);
            inputRef.current.value = '';
        }

        //setNewTaskTitle('');
    }

    return (
        <div className={'todolist'}>
            <h3>{title}</h3>
            <div className={'addTask'}>
                <input ref={inputRef} type="text" title={'hey'}/>
                {/*<Input changeTitle={setNewTaskTitle} title={newTaskTitle} taskTitleInput={taskTitleInput}/>*/}
                <Button name={'Add'} callBack={onClickButtonHandler}></Button>
            </div>
            <ul>
                {
                    tasks.length === 0 ? (
                        <p>Задач нет</p>
                    ) : (
                        tasksForTodoList.map((task) => {
                            const onRemoveHandler = () => {
                                removeTask(task.id)
                            }

                            return (
                                <li key={id}><input type={"checkbox"} checked={task.isDone}/>
                                    <span>{task.title}</span>

                                    <Button
                                        name={'x'}
                                        callBack={onRemoveHandler}
                                    />
                                </li>
                            )
                        })
                    )
                }
            </ul>
            <div className={'tabs'}>
                <Button name={'All'} callBack={onClickHandlerCreator('all')}></Button>
                <Button name={'Active'} callBack={onClickHandlerCreator('active')}></Button>
                <Button name={'Completed'} callBack={onClickHandlerCreator('completed')}></Button>
            </div>
        </div>
    );
}


export default Todolist;