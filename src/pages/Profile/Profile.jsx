import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/user/userActions';
import { useNavigate } from 'react-router-dom';
import ProfileFormUpdateInfo from '../../components/forms/ProfileForm/ProfileFormUpdateInfo';
import ProfileFormUpdatePassword from '../../components/forms/ProfileForm/ProfileFormUpdatePassword';

import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';

import style from './Profile.module.css';
import useModal from '../../hooks/useModal';
import StripeIndex from '../../components/Stripe/StripeIndex';
import ConnectedAccountIndex from '../../components/Stripe/ConnectedAccount/ConnectedAccountIndex';

const Profile = memo(() => {
  const { userInfo, successInfo, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserDetails());
  }, [navigate, successInfo, dispatch]);
  const modal = useModal();

  return (
    <div className={style.profile}>
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
              sx={{ p: '1rem'}}
              justifyContent="center"
            >
              <Avatar
                className={style.userImg}
                sx={{ width: '150px', height: '150px', m: '0 auto' }}
                src={userInfo?.userPhoto}
              />

              <Button
                sx={{ m: '10px' }}
                variant="contained"
                disabled={loading}
                onClick={() =>
                  modal.open('update-photo', {
                    width: 250,
                    height: 250,
                    aspect: 1,
                    canvasBorderRadius: 50,
                    path: 'updateUserPhoto',
                  })
                }
              >
                Change photo
                {loading && (
                  <Box sx={{ display: 'flex', paddingLeft: '10px'}}>
                    <CircularProgress size={'25px'} />
                  </Box>
                )}
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
                  <Typography variant="h6">Email: {userInfo?.email}</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h6">
                    First name: {userInfo?.firstName}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h6">
                    Last name: {userInfo?.lastName}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h6">
                    Public {userInfo?.publicName}
                  </Typography>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Card>
      </div>

      <div>
        <Card sx={{ p: '1rem' }}>
          <ProfileFormUpdateInfo />
          <ProfileFormUpdatePassword />
          <StripeIndex />
          <ConnectedAccountIndex />
        </Card>
      </div>
    </div>
  );
});

export default Profile;
