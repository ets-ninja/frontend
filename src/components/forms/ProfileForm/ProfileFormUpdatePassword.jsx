import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateUserPassword } from '../../../redux/user/userActions';
import { Button, Divider, TextField, Typography } from '@mui/material';

import style from '../../../pages/Profile/Profile.module.css';

const ProfileFormUpdatePassword = ({ setOpen }) => {
  const dispatch = useDispatch();

  const defaultValue = {
    password: '',
    newPassword: '',
  };

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = data => {
    dispatch(updateUserPassword(data));
    reset({ defaultValue });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Divider sx={{ p: '10px' }}>Security</Divider>
      <div className={style.security}>
        <Typography className={style.infoText} variant="h5">
          Change your password
        </Typography>
        <div>
          <div className={style.securityInput}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: 'Min length 6', minLength: 6 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    {...register('password')}
                    label="Password"
                    autoComplete="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    onChange={e => field.onChange(e.target.value)}
                  />
                )}
              />

              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                rules={{ required: 'Min length 6', minLength: 6 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    {...register('newPassword')}
                    label="New password"
                    autoComplete="newPassword"
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                    onChange={e => field.onChange(e.target.value)}
                  />
                )}
              />
            <Button
            sx={{maxHeight: '57px'}}
              onClick={() => setOpen(true)}
              type="submit"
              variant="contained"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileFormUpdatePassword;
