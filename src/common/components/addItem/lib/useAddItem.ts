import { ChangeEvent, useState } from 'react';
import * as React from 'react';

export const useItemForm = (addItem: (name: string) => void) => {
  //local state - not business tasks
  let [itemTitle, setNewItemTitle] = useState('');
  let [itemInputError, setItemInputError] = useState<string | null>(null);

  const isTitleToLong = itemTitle.length > 30;
  const ifTaskCanAdded = itemTitle && !isTitleToLong;

  const onClickAddItemHandler = () => {
    addItemWithCheck();
  };

  const saveItemTitleHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

  const setItemTitleHandler = (title: string) => {
    setNewItemTitle(title);
    setItemInputError(null);
  };

  const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setItemTitleHandler(event.currentTarget.value);
    isTitleToLong ? setItemInputError('Too long') : setItemInputError(null);
  };

  return {
    itemTitle,
    changeInputHandler,
    saveItemTitleHandler,
    itemInputError,
    onClickAddItemHandler,
  };
};
