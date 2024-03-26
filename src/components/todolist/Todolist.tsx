import styles from './Todolist.module.scss'
import React from "react";
import { TodolistPropsType } from "../../data/dataPropsTypes";

const  Todolist:React.FC<TodolistPropsType> = ({title, tasks, removeTask, changeFilter}: TodolistPropsType)  => {
	return (
		<div className={'todolist'}>
			<h3>{title}</h3>
			<div>
				<input type="text" />
				<button className={styles.btnRemove}>+</button>
			</div>
			<ul>
				{tasks.map(task => {
					return (
						<li><input type={"checkbox"} checked={task.isDone}/>
							<span>{task.title}</span>

							{/*<Button*/}
							{/*	title={'x'}*/}
							{/*	onClick={() => {*/}
							{/*		console.log('click')*/}
							{/*		removeTask(task.id)*/}
							{/*	}}*/}
							{/*/>*/}

							<button
								onClick={() => {
									removeTask(task.id)
								}}
								className={'btnRemove'}
							>x</button>
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