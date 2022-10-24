import { Avatar, Box, Button, LinearProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { useSelector } from 'react-redux';
import getModalData from '../redux/modal/modalSelectors';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 40,
  borderRadius: 20,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 20,
    background:
      'linear-gradient(270.27deg, #FBB13C 1.94%, rgba(251, 177, 60, 51) 99.95%);',
  },
}));

export default function UpdateJarModal() {
  const {
    user,
    createdAt = new Date(Date.now()),
    name = 'Toyota Supra',
    image = 'https://cdn.arstechnica.net/wp-content/uploads/2022/04/razer-book-800x450.jpg',
    expirationDate = new Date('25 Oct 2022 00:12:00'),
    value = 53334,
    goal = 60000,
    description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
  } = useSelector(getModalData);

  return (
    user && (
      <>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            alt={user.publicName || 'Rick Astley'}
            src={
              user.userPhoto ||
              'https://americansongwriter.com/wp-content/uploads/2022/03/RickAstley.jpeg?fit=2000%2C800'
            }
            sx={{ width: 64, height: 64 }}
          />
          <Typography variant="h3" component="p" sx={{ ml: 2 }}>
            {user.publicName || 'Rick Astley'}
          </Typography>
        </Box>
        <Box sx={{ pl: 3, pr: 3, mt: 2 }}>
          <Box sx={{ mb: 2 }}>
            <img
              src={image}
              alt={name}
              style={{ width: '100%', borderRadius: '10px' }}
            />
          </Box>
          <Typography variant="h5" component="p">
            {name}
          </Typography>
          <Typography variant="h6" component="p">
            Goal: {goal}$
          </Typography>
          <Box sx={{ width: '100%', position: 'relative' }}>
            <BorderLinearProgress
              variant="determinate"
              value={(value * 100) / goal}
              sx={{
                height: '45px',
                mt: 2,
                mb: 2,
              }}
            />
            <Typography
              variant="h5"
              component="p"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {value}$
            </Typography>
          </Box>
          <Typography>{description}</Typography>
        </Box>
        <Button
          sx={{
            width: '100%',
            fontSize: 35,
            mt: 3,
            mb: 3,
            borderRadius: 3,
            backgroundColor: '#FBB13C',
            boxShadow: 5,
            color: 'black',
            '&:hover': { backgroundColor: '#358255EE', color: 'white' },
          }}
        >
          Donate
        </Button>
      </>
    )
  );
}
