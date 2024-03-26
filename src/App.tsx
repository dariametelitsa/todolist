import React, { useState } from 'react';
import './App.scss';
import Todolist, { TaskType } from './components/todolist/Todolist';

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "CSS&HTML", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ]);

    let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id: number) {
        let filteredTasks = tasks.filter((t) => t.id !== id);
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodoList = tasks;
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />

            <Todolist
                title="What you are learning"
                tasks={tasks2}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

const tasks2: Array<TaskType> = [
    {id: 1, title: "XP", isDone: false},
    {id: 2, title: "DDD", isDone: true},
    {id: 3, title: "Scrum", isDone: false},
];

type TasksArrPropsType = {
    id: number,
    taskBlock: Array<TaskType>
}

const tasksArr: Array<TasksArrPropsType> = [
    {
        id: 1,
        taskBlock: [
            {id: 1, title: "XP", isDone: false},
            {id: 2, title: "DDD", isDone: true},
            {id: 3, title: "Scrum", isDone: false}
        ]
    },
    {
        id: 2,
        taskBlock: [
            {id: 1, title: "CSS&HTML", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "React", isDone: false},
            {id: 4, title: "Redux", isDone: false}
        ]
    }
]

