import { TextField } from '@mui/material';
import { Box } from '@mui/system';

export default function FilterForm({ register }) {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={e => e.preventDefault()}
    >
      <TextField
        {...register('filterQuery')}
        id="standard-basic"
        label="Search"
        variant="outlined"
        sx={{ mb: 2, width: '100% ' }}
      />
    </Box>
  );
}
