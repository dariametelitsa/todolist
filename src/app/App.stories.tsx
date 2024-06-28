import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import App from "./App";
import { ReduxStoreProviderDecorator } from "../stories/ReduxStoreProviderDecorator";
const meta: Meta<typeof App> = {
    title: 'Todolist/App',
    component: App,
    decorators: ReduxStoreProviderDecorator,
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
type Story = StoryObj<typeof App>;

export const TaskIsNotDoneStory: Story = {
    // render: () => <Provider store={store}><App></App></Provider>
};