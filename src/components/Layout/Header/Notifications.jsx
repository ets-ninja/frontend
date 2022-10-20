import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearNotificationsList,
  removeNotification,
} from '@redux/notifications/notificationSlice';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

const Notifications = () => {
  const { notificationList } = useSelector(state => state.notification);

  const [anchorElNotif, setAnchorElNotif] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {}, [notificationList]);

  const handleOpenNotifMenu = e => {
    setAnchorElNotif(e.currentTarget);
  };
  const handleCloseNotifMenu = () => {
    setAnchorElNotif(null);
  };

  const handleClickOnNotification = notification => {
    navigate(notification.data.clickAction);
    dispatch(removeNotification(notification));
  };

  return (
    <Box sx={{ flexGrow: 0, mr: '10px' }}>
      <Tooltip title="Open notifications">
        <IconButton onClick={handleOpenNotifMenu} sx={{ p: 0 }}>
          <Badge badgeContent={notificationList.length} color="error" max={9}>
            <NotificationsIcon
              sx={{
                color: 'white',
              }}
            />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElNotif}
        open={Boolean(anchorElNotif)}
        onClose={handleCloseNotifMenu}
        onClick={handleCloseNotifMenu}
      >
        <List
          sx={{
            width: '100%',
            maxWidth: 300,
            bgcolor: 'background.paper',
            p: 0,
            maxHeight: 300,
            overflowY: 'scroll',
          }}
        >
          {notificationList.length > 0 ? (
            <>
              <ListItem
                sx={{
                  width: '100%',
                }}
              >
                <ListItemButton
                  onClick={() => {
                    dispatch(clearNotificationsList());
                  }}
                  sx={{
                    dipsplay: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Remove all notifications
                </ListItemButton>
              </ListItem>
              {notificationList.map(notification => (
                <ListItem
                  key={notification.messageId}
                  disablePadding
                  sx={{
                    width: '100%',
                  }}
                >
                  <ListItemButton
                    onClick={() => {
                      handleClickOnNotification(notification);
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src={notification.notification?.image}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="You have new donation!"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body1"
                            color="text.primary"
                            display="block"
                          >
                            {notification.notification?.title}
                          </Typography>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            display="block"
                          >
                            {notification.notification?.body}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </>
          ) : (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="You have 0 nofitications" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Menu>
    </Box>
  );
};

export default Notifications;
