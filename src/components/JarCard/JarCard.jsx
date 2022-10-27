import MediaQuery from 'react-responsive';
import { Avatar, Button, Fade, Modal, Typography, Zoom } from '@mui/material';
import { Box } from '@mui/system';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { jarStepHandler, transformTransactionTime } from './utils';
import { useNavigate } from 'react-router-dom';
import SumLinearProgress from '../SumLinearProgress';
import DonateForm from '../forms/Stripe/DonateForm';
import { useState } from 'react';
import { setInfo } from '../../redux/snackbar/snackbarSlice';
import { useDispatch } from 'react-redux';

export default function JarCard({
  jar,
  idx,
  handleOpenModal = null,
  handleUserClick = null,
  isMyJar = false,
}) {
  const [showDonateMenu, setShowDonateMenu] = useState(false);
  const { userPhoto = null, publicName = null } = jar.user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    _id,
    name,
    image = null,
    value,
    goal,
    isPublic,
    creationDate,
    expirationDate = null,
    description,
    transactions = [],
  } = jar;
  return (
    <>
      <Zoom
        in={true}
        timeout={350}
        ease={'cubic-bezier(0.4, 0, 0.2, 1)'}
        style={{ transitionDelay: `${Math.round(10 * (1.618 * idx))}ms` }}
      >
        <Box
          onClick={e =>
            isMyJar ? navigate('/jar/' + _id) : handleOpenModal(e, jar)
          }
          sx={{
            color: theme => theme.colors.darkBlue,
            background: theme => theme.colors.white,
            boxSizing: 'border-box',
            border: '1px solid #86868666',
            outline: isMyJar
              ? isPublic
                ? '3px solid #52B02A'
                : '3px solid #EB3D2B'
              : '',
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
                cursor: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #ececec',
                px: { xs: 1, sm: 2 },
                py: 1,
              }}
              data-clickable={true}
            >
              {isMyJar === true && (
                <Typography
                  variant="h3"
                  component="p"
                  sx={{
                    maxWidth: '75%',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                  }}
                >
                  {isPublic ? 'Public' : 'Private'}
                </Typography>
              )}
              {isMyJar === false && (
                <Box
                  onClick={() => handleUserClick(jar.user)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    scale: '1',
                    cursor: 'pointer',
                    '&:hover p': {
                      transition: theme => theme.icon.hover.transition,
                      scale: '1.1',
                    },
                  }}
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
                    sx={{
                      ml: 1,
                      transition: theme => theme.icon.hover.transition,
                    }}
                    data-clickable={true}
                  >
                    {publicName}
                  </Typography>
                </Box>
              )}
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
                    height: {
                      xs: '240px',
                      smd: '181px',
                      md: '222px',
                      lg: '197px',
                      xl: '236px',
                    },
                  }}
                >
                  <img
                    src={jarStepHandler(value, goal)}
                    alt={`${name}`}
                    style={{
                      height: 'auto',
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
                    <Typography
                      component="p"
                      sx={{ pl: { xs: 1, sm: 2 }, mb: 1 }}
                    >
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
                      xs: image ? 'column-reverse' : 'row',
                      xxs: 'row',
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
                        {`${Math.floor(
                          new Date(new Date(expirationDate) - Date.now()) /
                            (24 * 60 * 60 * 1000),
                        )} d.`}
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
                onClick={() => setShowDonateMenu(true)}
              >
                Donate
              </Button>
              <ShareOutlinedIcon
                data-clickable={true}
                onClick={() => {
                  const urlLink = `${process.env.REACT_APP_SELF_URL}/basket/share-bank/${_id}`;
                  navigator.clipboard.writeText(urlLink);
                  dispatch(setInfo('Link copied to clipboard'));
                }}
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
      </Zoom>
      <Modal
        open={showDonateMenu}
        onClose={() => {
          setShowDonateMenu(false);
        }}
      >
        <Fade timeout={500} in={showDonateMenu}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              overflowY: 'auto',
              transform: 'translate(-50%, -50%)',
              bgcolor: '#ffffff',
              border: '1px solid transparent',
              outline: '1px solid transparent',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: 2,
              p: 3,
            }}
          >
            <DonateForm id={_id} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
