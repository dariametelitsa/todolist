// @flow
import * as React from 'react';
import { ButtonMemo } from 'common/components/button/ButtonMemo';
import Box from '@mui/material/Box';
import { FilterValues } from 'common/data/dataPropsTypes';
import { filterButtonsContainerSx } from 'features/todolistList/ui/todolist/ui/Todolist.styles';
import { useAppDispatch } from 'app/store';
import { useCallback } from 'react';
import { changedTodolistFilter } from 'features/todolistList/model/todolistsSlice';

type FiltersForTasksProps = {
  id: string;
  filter: FilterValues;
};
export const FilterTasksButtons = ({ id, filter }: FiltersForTasksProps) => {
  const dispatch = useAppDispatch();

  const changeFilterHandler = (filter: FilterValues) => {
    dispatch(changedTodolistFilter({ id: id, filter: filter }));
  };

  return (
    <Box sx={filterButtonsContainerSx}>
      <ButtonMemo
        color={'secondary'}
        variant={filter === 'all' ? 'contained' : 'outlined'}
        onClick={() => changeFilterHandler('all')}>
        All
      </ButtonMemo>
      <ButtonMemo
        color="primary"
        variant={filter === 'active' ? 'contained' : 'outlined'}
        onClick={() => changeFilterHandler('active')}>
        Active
      </ButtonMemo>
      <ButtonMemo
        color="success"
        variant={filter === 'completed' ? 'contained' : 'outlined'}
        onClick={() => changeFilterHandler('completed')}>
        completed
      </ButtonMemo>
    </Box>
  );
};
