import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function UserCard({ user, handleUserClick }) {
  return (
    <Box
      key={user._id}
      onClick={() => handleUserClick(user)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        background: '#ebebeb',
        borderRadius: '9999em',
        p: '2px',
        pr: 2,
        mr: 1,
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <Avatar
        alt={user.publicName || 'Rick Astley'}
        src={
          user.userPhoto ||
          'https://americansongwriter.com/wp-content/uploads/2022/03/RickAstley.jpeg?fit=2000%2C800'
        }
        sx={{ width: 56, height: 56 }}
      />
      <Typography variant="h3" component="p" sx={{ ml: 2 }}>
        {user.publicName || 'Rick Astley'}
      </Typography>
    </Box>
  );
}
