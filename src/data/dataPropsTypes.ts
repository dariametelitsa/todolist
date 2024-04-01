export type TaskType = {
    id: number;
    title: string;
    isDone?: boolean;
}

export type TasksPropsType = {
    id: number;
    title: string;
    tasks: Array<TaskType>;
};

export type TasksArrPropsType = {
    id: number;
    title: string;
    taskBlock: Array<TaskType>;
};

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistPropsType = {
    id: number;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: number) => void;
    addTask: (id: number, taskTitle: string) => void;
}

