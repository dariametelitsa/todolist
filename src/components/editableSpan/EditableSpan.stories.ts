import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { EditableSpan } from "./EditableSpan";

const meta: Meta<typeof EditableSpan> = {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
        updateItem: fn(),
        oldTitle: 'HTML',
        idToChange: '123'
    },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const TaskIsNotDoneStory: Story = {};