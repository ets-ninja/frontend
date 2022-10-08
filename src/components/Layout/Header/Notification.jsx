import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeNotification } from '../../../redux/notifications/notificationsSlice';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

const Notification = () => {
  const { notificationsList } = useSelector(state => state.notifications);

  const [anchorElNotif, setAnchorElNotif] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {}, [notificationsList]);

  const handleOpenNotifMenu = e => {
    setAnchorElNotif(e.currentTarget);
  };

  const handleCloseNotifMenu = () => {
    setAnchorElNotif(null);
  };

  const handleClickOnNotification = notification => {
    dispatch(removeNotification(notification));
  };

  return (
    <Box sx={{ flexGrow: 0, mr: '10px' }}>
      <Tooltip title="Open notifications">
        <IconButton onClick={handleOpenNotifMenu} sx={{ p: 0 }}>
          <NotificationsNoneIcon
            sx={{
              color: 'white',
              fontSize: '40px',
              position: 'relative',
            }}
          />
          <Typography
            sx={{
              color: 'white',
              fontSize: '12px',
              position: 'absolute',
            }}
          >
            {notificationsList.length}
          </Typography>
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
          }}
        >
          {notificationsList.length > 0 ? (
            notificationsList.map(notification => (
              <ListItem key={notification.messageId} disablePadding>
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
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {notification.notification?.title}
                        </Typography>
                        {notification.notification?.body}
                      </React.Fragment>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://static.vecteezy.com/system/resources/previews/002/521/570/original/cartoon-cute-bee-holding-a-honey-comb-signboard-showing-victory-hand-vector.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="You have new donation!"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Anton Podolian
                      </Typography>
                      {' 100$ -- On bayraktar jar'}
                    </React.Fragment>
                  }
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Menu>
    </Box>
  );
};

export default Notification;
