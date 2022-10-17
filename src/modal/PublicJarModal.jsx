import { useSelector } from 'react-redux';
import getModalData from '../redux/modal/modalSelectors';
import { Avatar, Box, Button, Typography } from '@mui/material';
import SumLinearProgress from '../components/SumLinearProgress';
import jarStepHandler from '../components/JarCard/jarStepHandler';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useState } from 'react';
import DonateForm from '../components/forms/Stripe/DonateForm'

export default function PublicJarModal() {
    const [showDonateMenu, setShowDonateMenu] = useState(null)
  const {
    user,
    createdAt = new Date(Date.now()),
    name,
    image = null,
    expirationDate = new Date('25 Oct 2022 00:12:00'),
    value,
    goal,
    description,
  } = useSelector(getModalData);

  return (
    user && (
      <Box
        sx={{
          p: { xs: 2, sm: 4 },
          pt: { sm: 2 },
          pb: { sm: 2 },
          maxWidth: '800px',
          minWidth: { sm: '566px', md: '600px' },
          maxHeight: { sm: '90vh' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar
              alt={user.publicName || 'Rick Astley'}
              src={user?.userPhoto}
              sx={{ width: 64, height: 64 }}
            />
            <Typography variant="h3" component="p" sx={{ ml: 2 }}>
              {user.publicName || 'Rick Astley'}
            </Typography>
          </Box>
          <Typography component="p" sx={{ fontWeight: '500' }}>
            {new Date(createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </Typography>
        </Box>
        <Box sx={{ pl: 3, pr: 3, mt: 2 }}>
          <Box sx={{ mb: 2 }}>
            {image ? (
              <img
                src={image}
                alt={name}
                style={{ width: '100%', borderRadius: '10px' }}
              />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  pt: 1,
                }}
              >
                <img
                  src={jarStepHandler(value, goal)}
                  alt={`${name}`}
                  style={{
                    height: '280px',
                    zIndex: '2',
                  }}
                />
              </Box>
            )}
          </Box>
          <Typography variant="h5" component="p">
            {name}
          </Typography>
          <Typography variant="h6" component="p">
            Goal: {goal}$
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'row-reverse',
            }}
          >
            <TimerOutlinedIcon />
            <Typography variant="h6" component="p" sx={{ fontWeight: '500' }}>
              Time Left:
              {` ${Math.floor(
                new Date(new Date(expirationDate) - Date.now()) /
                  (24 * 60 * 60 * 1000),
              )} days`}
            </Typography>
          </Box>
          <Box sx={{ width: '100%', position: 'relative' }}>
            <SumLinearProgress
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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            sx={{
              width: '100%',
              fontSize: '20px',
              ml: 1,
              mt: 1,
              p: 1,
              fontWeight: '500',
              borderRadius: '5px',
              backgroundColor: theme => theme.palette.secondary.main,
              boxShadow: 5,
              color: 'black',
              '&:hover': {
                backgroundColor: '#FBB13Ce9',
                color: 'white',
              },
            }}
            onClick={() =>  setShowDonateMenu(true)}
          >
            Donate
          </Button>
          <ShareOutlinedIcon
            data-clickable={true}
            sx={{
              width: '46px',
              height: '46px',
              px: '5px',
              ml: 1,
              scale: '1',
              transition: theme => theme.icon.hover.transition,
              fill: theme => theme.colors.darkBlue,
              '&:hover': theme => theme.icon.hover,
            }}
          />
        </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {showDonateMenu && <DonateForm />}    
          </Box>
      </Box>
    )
  );
}
