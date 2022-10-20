import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import * as Sentry from '@sentry/react';

import { addNotificationToken, getUserDetails } from '@redux/user/userActions';
import { logout } from '@redux/auth/authActions';

import {
  addNotification,
  clearNotificationsList,
} from '@redux/notifications/notificationSlice';

import ResponsiveContainer from '../../styled/ResponsiveContainer';
import Notifications from './Notifications';

import { styled } from '@mui/system';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Divider,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HiveIcon from '@mui/icons-material/Hive';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import showNotification from '@utils/notification/notificationApi';

const pages = [
  {
    name: 'My jars',
    link: '/myjars',
  },
  {
    name: 'Wishlist',
    link: '/wishlist',
  },
  {
    name: 'Savings schemes',
    link: '/savingsschemes',
  },
  {
    name: 'Public jars',
    link: '/public',
  },
];

const loggedOutPages = [
  {
    name: 'Login',
    link: '/login',
  },
  {
    name: 'Sign up',
    link: '/register',
  },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [socket, setSocket] = useState(null);
  const [isTokenSet, setIsTokenSet] = useState(false);
  const [isInRoom, setIsInRoom] = useState(false);
  const [isMessageListenerOn, setIsMessageListenerOn] = useState(false);
  const [permission, setPermission] = useState(false);

  const { userInfo } = useSelector(state => state.user);
  const { isLoggedIn } = useSelector(state => state.auth);
  const { notificationToken, isFCMSupported } = useSelector(
    state => state.notification,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isFCMSupported !== null && !isFCMSupported) {
      setSocket(io(process.env.REACT_APP_API_URL));
      const reqPerm = async () => {
        let permission = await Notification.requestPermission();
        setPermission(permission);
      };
      reqPerm();
    }
  }, [isFCMSupported]);

  useEffect(() => {
    if (socket && !isMessageListenerOn) {
      socket.on('message', data => {
        if (document.hidden && permission) {
          showNotification(data, navigate);
        }

        dispatch(addNotification(data));
      });
      setIsMessageListenerOn(true);

      return () => {
        socket.off('message');
        setIsMessageListenerOn(false);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserDetails());
    } else {
      if (isFCMSupported !== null && !isFCMSupported && socket) {
        socket.emit('leave');
        setIsInRoom(false);
      }
      dispatch(clearNotificationsList());
    }
  }, [dispatch, isFCMSupported, isLoggedIn, socket]);

  useEffect(() => {
    if (isFCMSupported !== null && !isFCMSupported && socket) {
      if (!isInRoom && isLoggedIn && userInfo?.id) {
        socket.emit('join', userInfo.id);
        setIsInRoom(true);
      }
    }
  }, [dispatch, isLoggedIn, socket, userInfo?.id, isInRoom, isFCMSupported]);

  useEffect(() => {
    if (
      isFCMSupported &&
      isLoggedIn &&
      !isTokenSet &&
      notificationToken &&
      userInfo?.notificationTokens &&
      !userInfo?.notificationTokens.includes(notificationToken)
    ) {
      try {
        dispatch(addNotificationToken());
        setIsTokenSet(true);
      } catch (err) {
        Sentry.captureException(err);
      }
    }
  }, [
    dispatch,
    notificationToken,
    isLoggedIn,
    userInfo?.notificationTokens,
    isTokenSet,
    isFCMSupported,
  ]);

  const handleOpenNavMenu = e => {
    setAnchorElNav(e.currentTarget);
  };
  const handleOpenUserMenu = e => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <ResponsiveContainer>
        <Toolbar disableGutters>
          <HiveIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/dashboard"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HoneyMoney
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {(isLoggedIn ? pages : loggedOutPages).map(page => (
                <MenuLink to={page.link} key={page.name}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </MenuLink>
              ))}
            </Menu>
          </Box>
          <HiveIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/dashboard"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              fontSize: 20,
              textDecoration: 'none',
            }}
          >
            HoneyMoney
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {(isLoggedIn ? pages : loggedOutPages).map(page => (
              <MenuLink to={page.link} key={page.name}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              </MenuLink>
            ))}
          </Box>
          {isLoggedIn && <Notifications />}
          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={userInfo?.userPhoto} />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElUser}
                id="account-menu"
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                onClick={handleCloseUserMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuLink to="/profile">
                  <MenuItem>
                    <Avatar src={userInfo?.userPhoto} />
                    Profile
                  </MenuItem>
                </MenuLink>
                <MenuLink to="/settings">
                  <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                </MenuLink>
                <Divider />
                <MenuLink onClick={logoutUser}>
                  <MenuItem>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </MenuLink>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </ResponsiveContainer>
    </AppBar>
  );
};

const MenuLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
});

export default Header;
