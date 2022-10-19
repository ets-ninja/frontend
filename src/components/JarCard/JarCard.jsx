import MediaQuery from 'react-responsive';
import { Avatar, Badge, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { jarStepHandler, transformTransactionTime } from './utils';
import { useNavigate } from 'react-router-dom';
import SumLinearProgress from '../SumLinearProgress';

export default function JarCard({
  bank,
  handleOpenModal = null,
  handleUserClick = null,
  isMyJar = false,
}) {
  const { userPhoto = null, publicName = null } = bank.user;
  const {
    _id,
    creationDate = new Date(Date.now()),
    name,
    image = null,
    expirationDate = null,
    value,
    goal,
    isPublic,
    description,
    transactions = [],
  } = bank;
  const formattedExpirationDate = () => {
    let days = Math.floor(
      new Date(new Date(expirationDate) - Date.now()) /
        (24 * 60 * 60 * 1000),
    )
    if(days <= 0) { return 'Expired' }
    return `${days}  d.`;
  }
  const navigate = useNavigate();
  return (
    <Box
      onClick={e => isMyJar ? navigate('/basket/' + _id) : handleOpenModal(e, bank)}
      sx={{
        color: theme => theme.colors.darkBlue,
        background: theme => theme.colors.white,
        boxSizing: 'border-box',
        border: '1px solid #86868666',
        outline: isMyJar ? isPublic ? '2px solid #00FF00' : '2px solid #DC143C' : '',
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
          {isMyJar === true && 
            <Typography
              variant="h3"
              component="p"
              sx={{
                maxWidth: '75%',
                fontWeight: '500',
                letterSpacing: '0.05em',
              }}>
              {isPublic ? 'Public' : 'Private'}
            </Typography>
          }
          {isMyJar === false && <Box
            onClick={() => handleUserClick(bank.user)}
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
          </Box> }
          <Typography component="p" sx={{ fontWeight: '500' }}>
            {new Date(creationDate).toLocaleDateString('en-US', {
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
          {image ? (
            <img
              src={image}
              alt={`${name}`}
              style={{
                display: 'block',
                maxWidth: '100%',
              }}
            />
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#EBEBEB',
                pt: 1,
              }}
            >
              <img
                src={jarStepHandler(value, goal)}
                alt={`${name}`}
                style={{
                  height: '197px',
                  zIndex: '2',
                }}
              />
            </Box>
          )}
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
                {description.length > 270
                  ? `${description.substring(0, 270)}. . .`
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
                <Typography component="p" sx={{ pl: { xs: 1, sm: 2, whiteSpace: 'pre-wrap' }, mb: 1 }}>
                  {description.length > 90
                    ? `${description.substring(0, 90)}. . .`
                    : description}
                </Typography>
              </MediaQuery>
            )}
            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column-reverse',
                  xxs: image ? 'row' : 'column-reverse',
                },
                justifyContent: 'space-between',
                px: 1,
              }}
            >
              <Typography component="p" sx={{ fontWeight: '500' }}>
                {`${value} of ${goal}`}
              </Typography>
              {expirationDate && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TimerOutlinedIcon />
                  <Typography component="p" sx={{ fontWeight: '500' }}>
                    {formattedExpirationDate()}
                  </Typography>
                </Box>
              )}
            </Box>
            <SumLinearProgress
              variant="determinate"
              value={(value * 100) / goal}
              sx={{
                height: '5px',
              }}
            />
            <Typography component="p" sx={{ fontSize: '13px', pl: 1 }}>
              {transformTransactionTime(transactions[0]?.createdAt)}
            </Typography>
          </Box>
          {image && (
            <Box
              sx={{
                height: '0px',
                width: '110px',
                flexShrink: 0,
                alignSelf: 'flex-end',
              }}
            >
              <img
                src={jarStepHandler(value, goal)}
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
          )}
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
                backgroundColor: '#FBB13Ce9',
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
              '&:hover svg': theme => theme.icon.hover,
            }}
          >
            <TextsmsOutlinedIcon
              sx={{
                width: '40px',
                height: '40px',
                px: '5px',
                scale: '1',
                transition: theme => theme.icon.hover.transition,
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
              transition: theme => theme.icon.hover.transition,
              fill: theme => theme.colors.darkBlue,
              '&:hover': theme => theme.icon.hover,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
