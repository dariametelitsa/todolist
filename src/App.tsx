import React from 'react';
import './App.css';
import Todolist, { TaskType } from './components/Todolist';

function App() {
	return (
		<div className="App">
			<Todolist title="What to learn" tasks={tasks1} />
			<Todolist title="What you are learning" tasks={tasks2} />
		</div>
		);
}

export default App;


const tasks1: Array<TaskType> = [
	{id: 1, title: "CSS&HTML",	isDone: true},
	{id: 2, title: "JS",	isDone: true},
	{id: 3, title: "React",	isDone: false},
	{id: 4, title: "Redux",	isDone: false},
];

const tasks2: Array<TaskType> = [
	{id: 1, title: "XP",	isDone: false},
	{id: 2, title: "DDD",	isDone: true},
	{id: 3, title: "Scrum",	isDone: false},
];