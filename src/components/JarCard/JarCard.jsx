import MediaQuery from 'react-responsive';
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

export default function JarCard({ bank, handleOpenModal = null }) {
  const {
    userPhoto = 'https://americansongwriter.com/wp-content/uploads/2022/03/RickAstley.jpeg?fit=2000%2C800',
    publicName = 'Rick Astley',
  } = bank.user;
  const {
    _id,
    createdAt = new Date(Date.now()),
    name = 'Toyota Supra',
    image = 'https://cdn.arstechnica.net/wp-content/uploads/2022/04/razer-book-800x450.jpg',
    expirationDate = new Date('25 Oct 2022 00:12:00'),
    value = 53334,
    finalGoal = 60000,
    description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
  } = bank;
  return (
    <Box
      key={_id}
      onClick={handleOpenModal}
      sx={{
        color: theme => theme.colors.darkBlue,
        background: theme => theme.colors.white,
        boxSizing: 'border-box',
        border: '1px solid #868686',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '5px',
        cursor: 'pointer',
        display: { md: 'flex' },
        flexDirection: { md: 'column' },
        justifyContent: { md: 'space-between' },
        flexBasis: {
          xs: '100%',
          smd: 'calc((100% - 15px) / 2)',
          md: 'calc((100% - 20px) / 2)',
          lg: 'calc((100% - 40px) / 3)',
          xl: 'calc((100% - 60px) / 3)',
        },
        '&:not(:last-of-type)': {
          mb: { xs: '15px', smd: '15px', md: '20px', xl: '30px' },
        },
        '&:nth-of-type(odd)': {
          mr: { md: '20px', smd: '15px', lg: '0' },
        },
        '&:not(:nth-of-type(3n))': {
          mr: { lg: '20px', xl: '30px' },
        },
        mb: { smd: '15px', md: '20px', xl: '30px' },
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #ececec',
            px: { xs: 1, sm: 2 },
            py: 1,
          }}
        >
          <Box
            sx={{ display: 'flex', alignItems: 'center' }}
            data-clickable={true}
          >
            <Avatar
              alt={`${publicName} avatar`}
              src={userPhoto}
              sx={{ width: 56, height: 56 }}
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
            {new Date(createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </Typography>
        </Box>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            '&:hover > .MuiBox-root': {
              opacity: 0.9,
              transform: 'translateY(0%)',
            },
          }}
        >
          <img
            src={image}
            alt={`${name}`}
            style={{
              display: 'block',
              maxWidth: '100%',
            }}
          />
          <MediaQuery minWidth={769}>
            <Box
              sx={{
                opacity: 0,
                height: '100%',
                width: '100%',
                zIndex: 1,
                transition:
                  'transform 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                backgroundColor: theme => theme.palette.secondary.main,
                position: 'absolute',
                top: 0,
                left: 0,
                transform: 'translateY(100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography align="center" sx={{ px: 2, py: 1 }}>
                {description.length > 450
                  ? `${description.substring(0, 365)}. . .`
                  : description}
              </Typography>
            </Box>
          </MediaQuery>
        </Box>
        <Box sx={{ background: '#EBEBEB', pt: 1 }}>
          <Typography
            variant="h3"
            component="p"
            sx={{
              pl: 2,
              maxWidth: '75%',
              fontWeight: '500',
              letterSpacing: '0.05em',
            }}
          >
            {name}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ pl: 1, mt: 1, flexGrow: '2' }}>
            {description && (
              <MediaQuery maxWidth={767}>
                <Typography component="p" sx={{ pl: { xs: 1, sm: 2 }, mb: 1 }}>
                  {description.length > 120
                    ? `${description.substring(0, 90)}. . .`
                    : description}
                </Typography>
              </MediaQuery>
            )}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column-reverse', xxs: 'row' },
                justifyContent: 'space-between',
                px: 1,
              }}
            >
              <Typography component="p" sx={{ fontWeight: '500' }}>
                {`${value} of ${finalGoal}`}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TimerOutlinedIcon />
                <Typography component="p" sx={{ fontWeight: '500' }}>
                  {`${Math.floor(
                    new Date(new Date(expirationDate) - Date.now()) /
                      (24 * 60 * 60 * 1000),
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
          </Box>
          <Box
            sx={{
              height: '0px',
              width: '110px',
              flexShrink: 0,
              alignSelf: 'flex-end',
            }}
          >
            <img
              src={jarStepHandler(value, finalGoal)}
              alt={`${name}`}
              style={{
                width: '100%',
                height: 'auto',
                zIndex: '2',
                position: 'relative',
                bottom: '146px',
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{ display: 'flex', alignItems: 'center', pb: 2, mt: 1 }}
          data-clickable={true}
        >
          <Button
            sx={{
              width: '100%',
              fontSize: '20px',
              ml: 1,
              p: 1,
              fontWeight: '500',
              borderRadius: '5px',
              backgroundColor: theme => theme.palette.secondary.main,
              boxShadow: 5,
              color: 'black',
              '&:hover': {
                backgroundColor: theme => theme.palette.secondary.main,
                color: 'white',
              },
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
            sx={{
              ml: 1,
              '&:hover svg': theme => theme.hover.icon,
            }}
          >
            <TextsmsOutlinedIcon
              sx={{
                width: '40px',
                height: '40px',
                px: '5px',
                scale: '1',
                transition: theme => theme.hover.icon.transition,
                fill: theme => theme.colors.darkBlue,
              }}
            />
          </Badge>
          <ShareOutlinedIcon
            data-clickable={true}
            sx={{
              width: '40px',
              height: '40px',
              px: '5px',
              scale: '1',
              transition: theme => theme.hover.icon.transition,
              fill: theme => theme.colors.darkBlue,
              '&:hover': theme => theme.hover.icon,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
