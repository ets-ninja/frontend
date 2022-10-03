import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/user/userActions';
import { useNavigate } from 'react-router-dom';
import ProfileFormUpdateInfo from '../../components/forms/ProfileForm/ProfileFormUpdateInfo';
import ProfileFormUpdatePassword from '../../components/forms/ProfileForm/ProfileFormUpdatePassword';

import {
  Alert,
  Avatar,
  Button,
  Card,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';

import style from './Profile.module.css';

const Profile = memo(() => {
  const [open, setOpen] = useState(true);
  const { userInfo, userToken, info, error } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserDetails(userToken));
  }, [navigate, info]);

  return (
    <div className={style.profile}>
      {error && (
        <Collapse in={open}>
          <Alert
            severity="error"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                UNDO
              </Button>
            }
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        </Collapse>
      )}
      <div>
        <Card>
          <Grid container alignItems="center">
            <Grid
              container
              item
              direction="column"
              gap={'15px'}
              xs={12}
              md={3}
              sx={{ p: '2rem' }}
              justifyContent="center"
            >
              <Avatar
                className={style.userImg}
                sx={{ width: '150px', height: '150px', m: '0 auto' }}
                src={userInfo.userPhoto}
              />

              <Button sx={{ m: '10px' }} variant="contained">
                Change photo
              </Button>
            </Grid>
            <Divider
              className={style.divider}
              orientation="vertical"
              flexItem
            />
            <Grid container item xs={12} md={6} sx={{ p: '2rem' }}>
              <List sx={{ width: '100%' }}>
                <ListItem>
                  <Typography variant="h6">Email: {userInfo.email}</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h6">
                    First name: {userInfo.firstName}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h6">
                    Last name: {userInfo.lastName}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h6">
                    Public {userInfo.publicName}
                  </Typography>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Card>
      </div>

      <div>
        <Card sx={{ p: '1rem' }}>
          <ProfileFormUpdateInfo setOpen={setOpen} />
          <ProfileFormUpdatePassword setOpen={setOpen} />
        </Card>
      </div>
    </div>
  );
});

export default Profile;
