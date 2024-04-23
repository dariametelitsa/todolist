export type todoListType = {
    id: string;
    title: string;
    filter : FilterValuesType;
}

export type TaskType = {
    id: string;
    title: string;
    isDone?: boolean;
}

export type TasksPropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    filter: FilterValuesType;
};

export type TasksArrPropsType = {
    id: string;
    title: string;
    taskBlock: Array<TaskType>;
};

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistPropsType = {
    children?: any;
    id: string;
    filter: FilterValuesType;
    changeFilter: (toListId: string, filter: FilterValuesType) => void;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string) => void;
    addTask: (taskTitle: string) => void;
    deleteAllTasks: () => void;
    setNewTaskStatus: (taskId: string, newIsDone: boolean) => void;
}

