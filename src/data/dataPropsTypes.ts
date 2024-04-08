export type TaskType = {
    id: string;
    title: string;
    isDone?: boolean;
}

export type TasksPropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
};

export type TasksArrPropsType = {
    id: string;
    title: string;
    taskBlock: Array<TaskType>;
};

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistPropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string) => void;
    addTask: (taskTitle: string) => void;
}

