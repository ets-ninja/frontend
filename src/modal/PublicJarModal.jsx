import { Avatar, Box, Button, LinearProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { useSelector } from 'react-redux';

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

export default function PublicJarModal() {
  const { basketInfo, ownerInfo } = useSelector(state => state.basket.basketInfo);

  console.log(basketInfo);
  console.log(ownerInfo)

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        pt: { sm: 2 },
        pb: { sm: 2 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt="Rick Astley"
          src={ownerInfo?.userPhoto}
          sx={{ width: 64, height: 64 }}
        />
        <Typography variant="h3" component="p" sx={{ ml: 2 }}>
          {ownerInfo.firstName} {ownerInfo.lastName}
        </Typography>
      </Box>
      <Box sx={{ pl: 3, pr: 3, mt: 2 }}>
        <Box sx={{ mb: 2 }}>
          <img
            src={basketInfo?.image}
            alt="Toyota Supra"
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </Box>
        <Typography variant="h5" component="p">
           {basketInfo.name}
        </Typography>
        <Typography variant="h6" component="p">
          Goal: {basketInfo.goal}
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

          </Typography>
        </Box>
        <Typography>
          {basketInfo.description}
        </Typography>
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
    </Box>
  );
}
