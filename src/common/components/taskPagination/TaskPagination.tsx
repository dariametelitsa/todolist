import Pagination from '@mui/material/Pagination';
import { PageSize } from 'features/todolistList/api/taskAPI';
import { ChangeEvent } from 'react';

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
    <>
      <Pagination
        count={Math.ceil(totalCount / PageSize)}
        page={page}
        shape="rounded"
        color={'primary'}
        onChange={changePageHandler}
      />
    </>
  );
};
