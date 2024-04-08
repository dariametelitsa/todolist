import React from 'react';
import './App.scss';
import { Tasks } from "./components/tasks/Tasks";
import { tasksArr } from "./data/Data";

export const sum = (a: number, b: number): number => {
    return a + b;
}

function App() {
    console.log(tasksArr[0]);
    return (
        <div className="App">
            <Tasks title={tasksArr[0].title} tasks={tasksArr[0].taskBlock} id={tasksArr[0].id}/>
            {/*<Tasks title={tasksArr[1].title} tasks={tasksArr[0].taskBlock} id={tasksArr[1].id}/>*/}
        </div>
    );
}

export default App;




