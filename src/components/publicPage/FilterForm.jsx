import { TextField } from '@mui/material';
import { Box } from '@mui/system';

export default function FilterForm({ register }) {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={e => e.preventDefault()}
      sx={{
        flexGrow: '3',
      }}
    >
      <TextField
        color="secondary"
        {...register('filterQuery')}
        id="standard-basic"
        label="Search"
        variant="outlined"
        sx={{ width: '100% ' }}
      />
    </Box>
  );
}
