import { FilterValuesType } from "../../App";
import './todolist.scss'
import React from "react";


export type TaskType = {
	id: number,
	title: string,
	isDone: boolean,
}

type TodolistPropsType = {
	title: string,
	tasks: Array<TaskType>,
	removeTask: (id: number) => void,
	changeFilter: (value: FilterValuesType) => void,
}

const  Todolist:React.FC<TodolistPropsType> = (props: TodolistPropsType)  => {
	const {title, tasks, removeTask, changeFilter} = props;
	return (
		<div className={'todolist'}>
			<h3>{title}</h3>
			<div>
				<input type="text" />
				<button>+</button>
			</div>
			<ul>
				{tasks.map(el => {
					return (
						<li><input type={"checkbox"} checked={el.isDone} />
						<span>{el.title}</span>
						<button
							onClick={() => {removeTask(el.id)}}
							className={'btnRemove'}
						>x</button>
					</li>
					)
				})}
			</ul>
			<div className={'tabs'}>
				<button onClick={() => {changeFilter('all')}}>All</button>
				<button onClick={() => {changeFilter('active')}}>Active</button>
				<button onClick={() => {changeFilter('completed')}}>Completed</button>
			</div>
		</div>
	);
}


export default Todolist;