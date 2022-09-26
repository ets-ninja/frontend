import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserInfo } from '../../redux/user/userActions';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';

import style from './Profile.module.css';

const Profile = memo(() => {
  const { userInfo, userToken, info } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = data => {
    dispatch(updateUserInfo(data));
    if (!!info.message) {
      alert(info.message);
    }
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    dispatch(getUserDetails(userToken));
  }, [navigate, info]);

  console.log(userInfo);

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
              sx={{ p: '2rem' }}
              justifyContent="center"
            >
              <Avatar
                className={style.userImg}
                sx={{ width: '150px', height: '150px', m: '0 auto' }}
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
          <form
            className={style.changeUserInfo}
            onSubmit={handleSubmit(submitForm)}
          >
            <Divider>Public Information</Divider>
            <div>
              <Typography className={style.infoText} variant="h5">
                First name & Last name
              </Typography>
              <div className={style.firstAndLastName}>
                <div className={style.input}>
                  <TextField
                    type="text"
                    {...register('firstName')}
                    label="First name"
                    autoComplete="firstName"
                    error={!!errors.firstName}
                  />
                  <Button type="submit" size="medium" variant="contained">
                    Save
                  </Button>
                </div>
                <div className={style.input}>
                  <TextField
                    type="text"
                    {...register('lastName')}
                    label="Last name"
                    autoComplete="lastName"
                    error={!!errors.lastName}
                  />
                  <Button type="submit" variant="contained">
                    Save
                  </Button>
                </div>
              </div>
              <div className={style.publicName}>
                <Typography className={style.infoText} variant="h5">
                  Public name
                </Typography>
                <div className={style.input}>
                  <TextField
                    type="text"
                    {...register('publicName')}
                    label="Public name"
                    autoComplete="publicName"
                    error={!!errors.publicName}
                  />
                  <Button type="submit" variant="contained">
                    Save
                  </Button>
                </div>
              </div>
            </div>
            <Divider sx={{ p: '10px' }}>Security</Divider>
            <div className={style.security}>
              <Typography className={style.infoText} variant="h5">
                Change your password
              </Typography>
              <div className={style.securityInput}>
                <TextField
                  type="password"
                  {...register('password', {
                    required: true,
                    minLength: 6,
                  })}
                  label="Password"
                  autoComplete="password"
                  error={!!errors.password}
                />
                <Button type="submit" variant="contained">
                  Save
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
});

export default Profile;
