import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { action } from '@storybook/addon-actions';
import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { AddItem } from './AddItem';

const meta: Meta<typeof AddItem> = {
  title: 'Todolist/AddItemForm',
  component: AddItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    addItem: {
      description: 'Button clicked inside form',
      // action: 'clicked', //old version
    },
  },
  args: { addItem: fn() }, //actual version
};

export default meta;
type Story = StoryObj<typeof AddItem>;

const addItemAction = async (name: string) => {
  action('clicked')(`Add Item called with: ${name}`);
  return Promise.resolve();
};

export const AddItemFormStory: Story = {
  args: { addItem: addItemAction },
};

const AddItemFormWithError = React.memo(({ addItem }: { addItem: (name: string) => Promise<any> }) => {
  //local state - not business tasks
  let [itemTitle, setNewItemTitle] = useState('');
  let [itemInputError, setItemInputError] = useState<string | null>('Title is required');

  const isTitleToLong = itemTitle.length > 20;
  const ifTaskCanAdded = itemTitle && !isTitleToLong;

  const onClickAddItemHandler = () => {
    addItemWithCheck();
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addItemWithCheck();
    }
  };
  const addItemWithCheck = () => {
    const trimmedTaskTitle = itemTitle.trim();
    if (ifTaskCanAdded) {
      if (trimmedTaskTitle) {
        addItem(trimmedTaskTitle);
        setNewItemTitle('');
      } else {
        setItemInputError('Title is required');
        setNewItemTitle('');
      }
    }
  };

  const onChangeSetItemTitle = (title: string) => {
    setNewItemTitle(title);
    setItemInputError(null);
  };

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeSetItemTitle(event.currentTarget.value);
    isTitleToLong ? setItemInputError('Too long') : setItemInputError(null);
  };

  return (
    <div>
      <TextField
        onChange={onChangeInputHandler}
        onKeyDown={onKeyDownHandler}
        label={'Введите заголовок'}
        variant="outlined"
        value={itemTitle}
        error={!!itemInputError}
        helperText={!!itemInputError ? `${itemInputError}` : ' '}
        size="small"
      />

      <IconButton onClick={onClickAddItemHandler} color={'primary'}>
        <AddBoxIcon />
      </IconButton>
    </div>
  );
});

export const AddItemFormWithErrorStory: Story = {
  render: (args) => <AddItemFormWithError addItem={args.addItem} />,
  // render: () => <AddItemFormWithError addItem={action('Clicked old version active')} />
};
