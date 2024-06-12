import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Task } from "./Task";
import { useState } from "react";
import { action } from "@storybook/addon-actions";
import * as React from "react";
import { ReactStoreProviderDecorator } from "../../stories/ReduxStoreProviderDecorator";

const meta: Meta<typeof Task> = {
    title: 'Todolist/Task',
    component: Task,
    decorators: ReactStoreProviderDecorator,
    parameters: {

        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
    args: {
        // onClick: fn()
    },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {
    args: {
        task: {id: 'taskID1', title: 'Title', isDone: false},
        todolistId: 'todoId1',
    },
};

export const TaskIsDoneStory: Story = {
    args: {
        task: {id: 'taskID2', title: 'Title', isDone: true},
        todolistId: 'todoId2',
    },
};

const TaskToggle = () => {
    const [task, setTask] = useState({id: 'taskID3', title: 'Title', isDone: false});
    const changeTaskStatus = () => {
        setTask({...task, isDone: !task.isDone});
    };

    const changeTaskTitle = (taskId: string, newTitle:string) => {
        setTask({...task, title: newTitle});
    };
    const removeTask = () => {
        action('Task Deleted');
    }
    return <Task task={task} todolistId={'todoId3'}/>
}

export const TaskTogleStory: Story = {
    render: () => <TaskToggle />
};

