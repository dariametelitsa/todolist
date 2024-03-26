import React from 'react';
import './App.scss';
import { Tasks } from "./components/tasks/Tasks";
import { data1, data2 } from "./data/Data";


function App() {

    // let [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: 1, title: "CSS&HTML", isDone: true},
    //     {id: 2, title: "JS", isDone: true},
    //     {id: 3, title: "React", isDone: false},
    //     {id: 4, title: "Redux", isDone: false},
    // ]);
    //
    // let [filter, setFilter] = useState<FilterValuesType>('all')
    //
    // function removeTask(id: number) {
    //     let filteredTasks = tasks.filter((t) => t.id !== id);
    //     console.log('here');
    //     setTasks(filteredTasks);
    // }
    //
    // function changeFilter(value: FilterValuesType) {
    //     setFilter(value);
    // }
    //
    // let tasksForTodoList = tasks;
    //
    // if (filter === 'completed') {
    //     tasksForTodoList = tasks.filter(t => t.isDone)
    // }
    //
    // if (filter === 'active') {
    //     tasksForTodoList = tasks.filter(t => !t.isDone)
    // }


    return (
        <div className="App">
            {/*<Todolist*/}
            {/*    title="What to learn"*/}
            {/*    tasks={tasksForTodoList}*/}
            {/*    removeTask={removeTask}*/}
            {/*    changeFilter={changeFilter}*/}
            {/*/>*/}

            <Tasks title={data1.title} tasks={data1.tasks} students={data1.students}/>
            <Tasks title={data2.title} tasks={data1.tasks} students={data2.students}/>
        </div>
    );
}

export default App;




