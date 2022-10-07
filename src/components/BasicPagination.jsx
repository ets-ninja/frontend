import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const BasicPagination = ({ pageCount, activePage, handleChangePage }) => {
  const handleChange = (event, value) => {
    handleChangePage(value);
  };

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
};

export default BasicPagination;
