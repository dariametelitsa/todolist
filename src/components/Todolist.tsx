
export type TaskType = {
	id: number,
	title: string,
	isDone: boolean,
}

type TodolistPropsType = {
	title: string,
	tasks: Array<TaskType>,
	// tasks2: TaskType[],
}

function Todolist(props: TodolistPropsType) {
	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<input type="text" />
				<button>+</button>
			</div>
			<ul>
				{props.tasks.map(el => {
					return <li><input type={"checkbox"} checked={el.isDone} /><span>{el.title}</span></li>
				})}
				{/*<li><input type={"checkbox"} checked={props.tasks[0].isDone} /><span>{props.tasks[0].title}</span></li>*/}
				{/*<li><input type="checkbox" checked={props.tasks[1].isDone} /><span>{props.tasks[1].title}</span></li>*/}
				{/*<li><input type="checkbox" checked={props.tasks[2].isDone} /><span>{props.tasks[2].title}</span></li>*/}
			</ul>
			<div>
				<button>All</button>
				<button>Active</button>
				<button>Completed</button>
			</div>
		</div>
	);
}


export default Todolist;