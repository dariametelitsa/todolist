import { FilterValuesType } from "../App";


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

function Todolist(props: TodolistPropsType) {
	return (
		<div className={'todolist'}>
			<h3>{props.title}</h3>
			<div>
				<input type="text" />
				<button>+</button>
			</div>
			<ul>
				{props.tasks.map(el => {
					return <li><input type={"checkbox"} checked={el.isDone} />
						<span>{el.title}</span>
						<button
							onClick={() => {props.removeTask(el.id)}}
							className={'btnRemove'}
						>x</button>
					</li>
				})}
			</ul>
			<div className={'tabs'}>
				<button onClick={() => {props.changeFilter('all')}}>All</button>
				<button onClick={() => {props.changeFilter('active')}}>Active</button>
				<button onClick={() => {props.changeFilter('completed')}}>Completed</button>
			</div>
		</div>
	);
}


export default Todolist;