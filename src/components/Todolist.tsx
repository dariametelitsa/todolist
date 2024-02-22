export function Todolist() {
	return (
		<div>
			<h3>What to learn</h3>
			<div>
				<input type="text" />
				<button>+</button>
			</div>
			<ul>
				<li><input type={"checkbox"} checked={true} /><span>CSS&HTML</span></li>
				<li><input type="checkbox" checked={true} /><span>JS</span></li>
				<li><input type="checkbox" checked={false} /><span>React</span></li>
			</ul>
			<div>
				<button>All</button>
				<button>Active</button>
				<button>Completed</button>
			</div>
		</div>
	);
}
