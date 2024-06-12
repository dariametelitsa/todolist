import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import AppWithRedux from "./AppWithRedux";
import { ReduxStoreProviderDecorator } from "./stories/ReduxStoreProviderDecorator";
const meta: Meta<typeof AppWithRedux> = {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
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
type Story = StoryObj<typeof AppWithRedux>;

export const TaskIsNotDoneStory: Story = {
    // render: () => <Provider store={store}><AppWithRedux></AppWithRedux></Provider>
};