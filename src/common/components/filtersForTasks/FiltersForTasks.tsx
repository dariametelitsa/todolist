// @flow
import * as React from 'react';
import { ButtonMemo } from '../button/ButtonMemo';
import Box from '@mui/material/Box';
import { FilterValuesType } from '../../data/dataPropsTypes';
import { filterButtonsContainerSx } from 'features/todolistList/ui/todolist/ui/Todolist.styles';

type FiltersForTasksProps = {
  filter: FilterValuesType;
  filterCheck: (filter: FilterValuesType) => () => void;
};
export const FiltersForTasks = ({ filter, filterCheck }: FiltersForTasksProps) => {
  return (
    <Box sx={filterButtonsContainerSx}>
      <ButtonMemo
        color={'secondary'}
        variant={filter === 'all' ? 'contained' : 'outlined'}
        onClick={filterCheck('all')}>
        All
      </ButtonMemo>
      <ButtonMemo
        color="primary"
        variant={filter === 'active' ? 'contained' : 'outlined'}
        onClick={filterCheck('active')}>
        Active
      </ButtonMemo>
      <ButtonMemo
        color="success"
        variant={filter === 'completed' ? 'contained' : 'outlined'}
        onClick={filterCheck('completed')}>
        completed
      </ButtonMemo>
    </Box>
  );
};
