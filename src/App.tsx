import React from 'react';
import './App.scss';
import { Tasks } from "./components/tasks/Tasks";
import { data1, data2 } from "./data/Data";

export const sum = (a: number, b: number): number => {
    return a + b;
}

function App() {

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




