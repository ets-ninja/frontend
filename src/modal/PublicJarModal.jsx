import { Avatar, Box, Button, LinearProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';

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
      'linear-gradient(270.27deg, #58D68D 1.94%, rgba(88, 214, 141, 0.51) 99.95%);',
  },
}));

export default function PublicJarModal() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt="Rick Astley"
          src="https://americansongwriter.com/wp-content/uploads/2022/03/RickAstley.jpeg?fit=2000%2C800"
          sx={{ width: 64, height: 64 }}
        />
        <Typography variant="h3" component="p" sx={{ ml: 2 }}>
          Rick Astley
        </Typography>
      </Box>
      <Box sx={{ pl: 3, pr: 3, mt: 2 }}>
        <Box sx={{ mb: 2 }}>
          <img
            src="https://images.unsplash.com/photo-1603811478698-0b1d6256f79a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Toyota Supra"
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </Box>
        <Typography variant="h5" component="p">
          Toyota Supra
        </Typography>
        <Typography variant="h6" component="p">
          Goal: 50 000$
        </Typography>
        <Box sx={{ width: '100%', position: 'relative' }}>
          <BorderLinearProgress
            variant="determinate"
            value={(18500 * 100) / 50000}
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
            18 500$
          </Typography>
        </Box>
        <Typography>
          I’ve never gave you up, now i want supra, dont let me down, or desert
          me. Donate pls. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been
        </Typography>
      </Box>
      <Button
        sx={{
          width: '100%',
          fontSize: 35,
          mt: 3,
          mb: 3,
          borderRadius: 3,
          backgroundColor: '#58D68D',
          boxShadow: 5,
          color: 'black',
          '&:hover': { backgroundColor: '#358255', color: 'white' },
        }}
      >
        Donate
      </Button>
    </>
  );
}
