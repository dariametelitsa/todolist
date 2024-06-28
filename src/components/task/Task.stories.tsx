import type { Meta, StoryObj } from '@storybook/react';
import { Task } from "./Task";
import * as React from "react";
import { useLayoutEffect } from "react";
import { ReduxStoreProviderDecorator } from "../../stories/ReduxStoreProviderDecorator";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "../../model/store";
import { TaskStatuses, TaskType, TodoTaskPriorities } from "../../api/todolist-api";
import { addTaskTC } from "../../model/thunk/tasksThunks";

const meta: Meta<typeof Task> = {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    // argTypes: {
    //     // backgroundColor: { control: 'color' },
    // },
    // args: {
    //     // onClick: fn()
    // },
};

export default meta;
type Story = StoryObj<typeof Task>;

// export const TaskIsNotDoneStory: Story = {
//     args: {
//         task: {id: v1(), title: 'Title', isDone: false},
//         todolistId: 'todolistId1',
//     },
// };
//
// export const TaskIsDoneStory: Story = {
//     args: {
//         task: {id: 'taskID2', title: 'Title', isDone: true},
//         todolistId: 'todoId2',
//     },
// };
// const TaskToggle = () => {
//     const [task, setTask] = useState({id: 'taskID3', title: 'Title', isDone: false});
//     const changeTaskStatus = () => {
//         setTask({...task, isDone: !task.isDone});
//     };
//
//     const changeTaskTitle = (taskId: string, newTitle:string) => {
//         setTask({...task, title: newTitle});
//     };
//     const removeTask = () => {
//         action('Task Deleted');
//     }
//     return <Task task={task} todolistId={'todoId3'}/>
// }
//
// export const TaskTogleStory: Story = {
//     render: () => <TaskToggle />
// };

const TaskWithRedux = () => {
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0]);
    const dispatch = useAppDispatch();

    if(!task) task =  {id: '1', status: TaskStatuses.New, title: 'XP', todoListId: 'todolistId1', description: '', priority: TodoTaskPriorities.Low, order: 0, addedDate: '', startDate: '', deadline: ''};
    useLayoutEffect(() => {
        console.log(task)
        if(task.id === 'fake') {
            dispatch(addTaskTC('todolistId1', 'DEFAULT'));
        }
    }, [task,dispatch]);

    return <Task task={task} todolistId={'todolistId1'}/>
}

export const TaskTogleStory: Story = {
    render: () => <TaskWithRedux />
};


