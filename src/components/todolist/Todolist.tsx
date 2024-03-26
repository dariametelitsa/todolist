import { FilterValuesType } from "../../App";
import styles from './Todolist.module.scss'
import React from "react";
import { Button } from "../button/Button";


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

const  Todolist:React.FC<TodolistPropsType> = ({title, tasks, removeTask, changeFilter}: TodolistPropsType)  => {
	return (
		<div className={'todolist'}>
			<h3>{title}</h3>
			<div>
				<input type="text" />
				<button className={styles.btnRemove}>+</button>
			</div>
			<ul>
				{tasks.map(el => {
					return (
						<li><input type={"checkbox"} checked={el.isDone}/>
							<span>{el.title}</span>
							<Button
								title={'x'}
								onClick={() => {
									removeTask(el.id)
								}}
								// className={styles.btnRemove}
							/>
						</li>
					)
				})}
			</ul>
			<div className={'tabs'}>
				<button onClick={() => {
					changeFilter('all')}}>All</button>
				<button onClick={() => {changeFilter('active')}}>Active</button>
				<button onClick={() => {changeFilter('completed')}}>Completed</button>
			</div>
		</div>
	);
}


export default Todolist;