export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

export type TasksPropsType = {
    title: string,
    tasks: Array<TaskType>,
    students: Array<string>
};

export type TasksArrPropsType = {
    id: number,
    taskBlock: Array<TaskType>
};

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: number) => void,
    changeFilter: (value: FilterValuesType) => void,
}

