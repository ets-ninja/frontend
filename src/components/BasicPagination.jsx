import React from 'react';
import { Pagination, Stack } from '@mui/material';

const BasicPagination = ({ pageCount, activePage, handleChangePage }) => {
  const handleChange = (event, value) => {
    handleChangePage(value);
  };

  if (pageCount) {
    return (
      <Stack spacing={2}>
        <Pagination
          count={pageCount}
          page={activePage}
          siblingCount={0}
          onChange={handleChange}
          sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
        />
      </Stack>
    );
  }
};

export default BasicPagination;
