import React, { ChangeEvent, useState } from "react";
import { FilterValuesType, TaskType, TodolistPropsType } from "../../data/dataPropsTypes";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import S from './Todolist.module.scss';
import { useAutoAnimate } from "@formkit/auto-animate/react";

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
                                                   addTask,
                                                   deleteAllTasks,
                                                   setNewTaskStatus,
                                               }: TodolistPropsType) => {
    let [TaskTitle, setNewTaskTitle] = useState('');

    //local state
    let [filter, setFilter] = useState<FilterValuesType>('all')
    let [taskInputError, setTaskInputError] = useState<string | null>(null);

    const [listRef] = useAutoAnimate<HTMLUListElement>()
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
        addTask(TaskTitle.trim());
        setNewTaskTitle('');
    }

    const onClickHandlerCreator = (filter: FilterValuesType) => {
        return () => setFilter(filter);
    }

    const onKeyDownHandler = () => {
        if (ifTaskCanAdded) {
            addTask(TaskTitle.trim());
            setNewTaskTitle('');
        }
    }

    const onClickHandlerDeleteAll = () => {
        deleteAllTasks();
    }


    const isTitleToLong = TaskTitle.length > 15;
    const ifTaskCanAdded = TaskTitle.trim() && !isTitleToLong;

    return (
        <div className={S.todolist}>
            <h3>{title}</h3>
            <div className={S.addTask}>
                {/*<input ref={inputRef} type="text" title={'hey'}/>*/}
                <Input changeTitle={setNewTaskTitle} title={TaskTitle} onKeyDown={onKeyDownHandler}/>
                <Button title={'Add'} callBack={onClickButtonHandler} isDisabled={!ifTaskCanAdded}></Button>
                {
                    isTitleToLong && <div>too long</div>
                }
            </div>
            <ul ref={listRef}>
                {
                    tasks.length === 0 ? (
                        <p>Задач нет</p>
                    ) : (
                        tasksForTodoList.map((task) => {
                            const onChangeSetTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskStatus(task.id, e.currentTarget.checked);
                            return (
                                <li key={id}>
                                    <input type={"checkbox"} checked={task.isDone}
                                           onChange={onChangeSetTaskStatusHandler}/>
                                    <span className={task.isDone ? 'taskDone' : 'task'}>{task.title}</span>
                                    <Button title={'x'} callBack={() => removeTask(task.id)}/>
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
                <Button className={filter === 'all' ? 'filterActive + button' : 'button'} title={'All'}
                        callBack={onClickHandlerCreator('all')}></Button>
                <Button className={filter === 'active' ? 'filterActive + button' : 'button'} title={'Active'}
                        callBack={onClickHandlerCreator('active')}></Button>
                <Button className={filter === 'completed' ? 'filterActive + button' : 'button'} title={'Completed'}
                        callBack={onClickHandlerCreator('completed')}></Button>
            </div>
            {children && children}
        </div>
    );
}


export default Todolist;