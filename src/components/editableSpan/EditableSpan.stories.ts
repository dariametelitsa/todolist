import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from "react";
import { action } from "@storybook/addon-actions";
import * as React from "react";
import { ReactStoreProviderDecorator } from "../../stories/ReduxStoreProviderDecorator";
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