import { useSelector } from 'react-redux';
import { useState } from 'react';
import { getModalData } from '../redux/modal/modalSelectors';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { jarStepHandler } from '../components/JarCard/utils';
import SumLinearProgress from '../components/SumLinearProgress';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DonateForm from '../components/forms/Stripe/DonateForm';

export default function PublicJarModal() {
  const [showDonateMenu, setShowDonateMenu] = useState(null);
  const data = useSelector(getModalData);
  return (
    data?.user && (
      <Box
        sx={{
          overflowY: 'auto',
          p: { xs: 2, sm: 4, md: 4 },
          pt: { sm: 2, md: 2 },
          pb: { sm: 2, md: 2 },
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
              alt={data.user.publicName || 'Rick Astley'}
              src={data.user.userPhoto}
              sx={{ width: 64, height: 64 }}
            />
            <Typography variant="h3" component="p" sx={{ ml: 2 }}>
              {data.user.publicName || 'Rick Astley'}
            </Typography>
          </Box>
          <Typography component="p" sx={{ fontWeight: '500' }}>
            {new Date(data.creationDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </Typography>
        </Box>
        <Box sx={{ pl: 3, pr: 3, mt: 2 }}>
          <Box sx={{ mb: 2 }}>
            {data.image ? (
              <img
                src={data.image}
                alt={data.name}
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
                  src={jarStepHandler(data.value, data.goal)}
                  alt={`${data.name}`}
                  style={{
                    height: '280px',
                    zIndex: '2',
                  }}
                />
              </Box>
            )}
          </Box>
          <Typography variant="h5" component="p">
            {data.name}
          </Typography>
          <Typography variant="h6" component="p">
            Goal: {data.goal}$
          </Typography>
          {data.expirationDate && (
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
                  new Date(new Date(data.expirationDate) - Date.now()) /
                    (24 * 60 * 60 * 1000),
                )} days`}
              </Typography>
            </Box>
          )}
          <Box sx={{ width: '100%', position: 'relative' }}>
            <SumLinearProgress
              variant="determinate"
              value={(data.value * 100) / data.goal}
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
              {data.value}$
            </Typography>
          </Box>
          <Typography>{data.description}</Typography>
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
            onClick={() => setShowDonateMenu(true)}
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {showDonateMenu && <DonateForm />}
        </Box>
      </Box>
    )
  );
}
