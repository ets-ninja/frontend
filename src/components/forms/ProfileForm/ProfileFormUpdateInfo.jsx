import React from 'react';
import { updateUserInfo } from '../../../redux/user/userActions';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, Divider, TextField, Typography } from '@mui/material';

import style from '../../../pages/Profile/Profile.module.css';

const ProfileFormUpdateInfo = () => {
  const dispatch = useDispatch();

  const defaultValue = {
    firstName: '',
    lastName: '',
    publicName: '',
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const submitForm = data => {
    dispatch(updateUserInfo(data));
    reset({ defaultValue });
  };

  return (
    <form className={style.changeUserInfo} onSubmit={handleSubmit(submitForm)}>
      <Divider>Public Information</Divider>
      <div>
        <Typography className={style.infoText} variant="h5">
          First name & Last name
        </Typography>
        <div className={style.firstAndLastName}>
          <div className={style.input}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  {...register('firstName')}
                  label="First name"
                  autoComplete="firstName"
                  error={!!errors.firstName}
                  onChange={e => field.onChange(e.target.value)}
                />
              )}
            />
            <Button type="submit" size="medium" variant="contained">
              Save
            </Button>
          </div>
          <div className={style.input}>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  {...register('lastName')}
                  label="Last name"
                  autoComplete="lastName"
                  error={!!errors.lastName}
                  onChange={e => field.onChange(e.target.value)}
                />
              )}
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
            <Controller
              name="publicName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  {...register('publicName')}
                  label="Public name"
                  autoComplete="publicName"
                  error={!!errors.publicName}
                  onChange={e => field.onChange(e.target.value)}
                />
              )}
            />
            <Button type="submit" variant="contained">
              Save
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileFormUpdateInfo;
