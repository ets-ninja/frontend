import {
  Avatar,
  Badge,
  Button,
  LinearProgress,
  linearProgressClasses,
  styled,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import jarStepHandler from './jarStepHandler';

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

export default function JarCard({ user, bank, handleOpenModal = null }) {
  const {
    userPhoto = 'https://americansongwriter.com/wp-content/uploads/2022/03/RickAstley.jpeg?fit=2000%2C800',
    publicName = 'Rick Astley',
  } = user;
  const {
    createdAt = new Date(Date.now()),
    name = 'Toyota Supra',
    image = 'https://images.unsplash.com/photo-1603811478698-0b1d6256f79a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    expirationDate = new Date('25 Oct 2022 00:12:00'),
    value = 53334,
    finalGoal = 60000,
  } = bank;
  return (
    <Box
      onClick={handleOpenModal}
      sx={{
        background: '#FCFCFC',
        boxSizing: 'border-box',
        border: '1px solid #868686',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '5px',
        display: { md: 'flex' },
        flexDirection: { md: 'column' },
        justifyContent: { md: 'space-between' },
        flexBasis: {
          xs: '100%',
          md: 'calc((100% - 20px) / 2)',
          lg: 'calc((100% - 40px) / 3)',
          xl: 'calc((100% - 60px) / 3)',
        },
        '&:not(:last-of-type)': {
          mb: { xs: '15px', md: '0' },
        },
        '&:nth-last-of-type(even)': {
          mr: { md: '20px', lg: '0' },
        },
        '&:not(:nth-last-of-type(-n+2))': {
          mb: { md: '20px', lg: '0' },
        },
        '&:not(:nth-of-type(3n))': {
          mr: { lg: '20px', xl: '30px' },
        },
        '&:not(:nth-last-of-type(-n+3))': {
          mb: { lg: '20px', xl: '30px' },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #ececec',
          p: { xs: 1, sm: 2 },
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center' }}
          data-clickable={true}
        >
          <Avatar
            alt={`${publicName} avatar`}
            src={userPhoto}
            sx={{ width: 64, height: 64 }}
            data-clickable={true}
          />
          <Typography
            variant="h3"
            component="p"
            sx={{ ml: 1 }}
            data-clickable={true}
          >
            {publicName}
          </Typography>
        </Box>
        <Typography component="p" sx={{ fontWeight: '500' }}>
          {createdAt.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </Typography>
      </Box>
      <Typography
        variant="h3"
        component="p"
        sx={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: '500',
          letterSpacing: '0.05em',
          my: { xs: 1, sm: 2 },
        }}
      >
        {name}
      </Typography>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={jarStepHandler(value, finalGoal)}
          alt={`${name}`}
          style={{ height: '320px' }}
        />
        <Box
          sx={{
            position: 'absolute',
            height: '95px',
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#EBEBEB',
            padding: '8px',
          }}
        >
          <img
            src={image}
            alt={`${name}`}
            style={{
              display: 'block',
              height: '100%',
            }}
          />
          <Box
            sx={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background:
                'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.0419) 13.19%, rgba(255, 255, 255, 0.1) 15.21%, rgba(255, 255, 255, 0.1) 30.97%, rgba(0, 0, 0, 0) 39.19%, rgba(0, 0, 0, 0.02) 74.98%, rgba(255, 255, 255, 0.1) 78.81%, rgba(255, 255, 255, 0.105) 87.56%, rgba(0, 0, 0, 0.0108) 92.18%, rgba(0, 0, 0, 0) 99.19%)',
            }}
          ></Box>
        </Box>
      </Box>
      <Box sx={{ px: { xs: 1, sm: 2 }, mt: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
          <Typography component="p" sx={{ fontWeight: '500' }}>
            {`${value} of ${finalGoal}`}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TimerOutlinedIcon />
            <Typography component="p" sx={{ fontWeight: '500' }}>
              {`${Math.floor(
                new Date(expirationDate - Date.now()) / (24 * 60 * 60 * 1000),
              )} d.`}
            </Typography>
          </Box>
        </Box>
        <BorderLinearProgress
          variant="determinate"
          value={(value * 100) / finalGoal}
          sx={{
            height: '5px',
          }}
        />
        <Typography component="p" sx={{ fontSize: '13px', pl: 1 }}>
          Last donation 5 min. ago
        </Typography>
        <Box
          sx={{ display: 'flex', alignItems: 'center', pb: 2, mt: 2 }}
          data-clickable={true}
        >
          <Button
            sx={{
              width: '100%',
              fontSize: '20px',
              p: 1,
              fontWeight: '500',
              borderRadius: '5px',
              backgroundColor: '#FBB13C',
              boxShadow: 5,
              color: 'black',
              '&:hover': { backgroundColor: '#FBB13CE0', color: 'white' },
            }}
          >
            Donate
          </Button>
          <Badge
            badgeContent={12}
            overlap="circular"
            color="secondary"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            data-clickable={true}
          >
            <TextsmsOutlinedIcon
              sx={{ width: '40px', height: '40px', ml: 1 }}
            />
          </Badge>
          <ShareOutlinedIcon
            data-clickable={true}
            sx={{ width: '40px', height: '40px' }}
          />
        </Box>
      </Box>
    </Box>
  );
}
