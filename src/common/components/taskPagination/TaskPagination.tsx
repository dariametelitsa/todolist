import Pagination from '@mui/material/Pagination';
import { PageSize } from 'features/todolistList/api/taskAPI';
import { ChangeEvent } from 'react';
import Box from '@mui/material/Box';

type Props = {
  totalCount: number;
  page: number;
  setPage: (page: number) => void;
};

export const TaskPagination = ({ setPage, page, totalCount }: Props) => {
  const changePageHandler = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={1}>
      <Pagination
        count={Math.ceil(totalCount / PageSize)}
        page={page}
        shape="rounded"
        color={'primary'}
        onChange={changePageHandler}
      />
    </Box>
  );
};
