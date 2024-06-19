import type { Meta, StoryObj } from '@storybook/react';
import { Task } from "./Task";
import * as React from "react";
import { useLayoutEffect } from "react";
import { ReduxStoreProviderDecorator } from "../../stories/ReduxStoreProviderDecorator";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../../model/store";
import { TaskType } from "../../data/dataPropsTypes";
import { addTaskAC } from "../../model/tasksReduser";

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
    let task = useSelector<AppRootState, TaskType>(state => state.tasks['todolistId1'][0]);
    const dispatch = useDispatch();

    if(!task) task = {id: 'fake', title: 'test', isDone: false};
    useLayoutEffect(() => {
        console.log(task)
        if(task.id === 'fake') {
            dispatch(addTaskAC('todolistId1', 'DEFAULT'));
        }
    }, [task,dispatch]);

    return <Task task={task} todolistId={'todolistId1'}/>
}

export const TaskTogleStory: Story = {
    render: () => <TaskWithRedux />
};


