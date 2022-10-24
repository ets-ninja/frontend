import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function UserCard({ user, handleUserClick }) {
  return (
    <Box
      onClick={() => handleUserClick(user)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        background: '#ebebeb',
        borderRadius: '9999em',
        p: '2px',
        pr: 2,
        mr: 1,
        mb: 1,
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <Avatar
        alt={user.publicName}
        src={user?.userPhoto}
        sx={{ width: 56, height: 56 }}
      />
      <Typography variant="h3" component="p" sx={{ ml: 2 }}>
        {user.publicName}
      </Typography>
    </Box>
  );
}
