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
    [id: string]: Array<TaskType>;
};

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistPropsType = {
    children?: any;
    id: string;
    filter: FilterValuesType;
    changeFilter: (toListId: string, filter: FilterValuesType) => void;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (todolistId: string, id: string) => void;
    addTask: (todolistId: string, taskTitle: string) => void;
    deleteAllTasks: (todolistId: string) => void;
    setNewTaskStatus: (todolistId: string, taskId: string, newIsDone: boolean) => void;
    removeTodolist: (todolistId: string) => void;
}

