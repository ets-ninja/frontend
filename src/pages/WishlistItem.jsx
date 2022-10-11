import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ResponsiveContainer from '../components/styled/ResponsiveContainer';
import {
  Box,
  Button,
  Typography,
  IconButton,
  CardMedia,
  Stack,
  TextField,
  InputAdornment,
  Input,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';
import { Controller, useForm } from 'react-hook-form';

import request from '../hooks/useRequest';

const WishlistItem = () => {
  const [itemInfo, setItemInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const { loading, sendRequest } = request();

  let { id } = useParams();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getItemInfo();
  }, []);

  const getItemInfo = async () => {
    let data;
    try {
      data = await sendRequest(`api/wishlist/${id}`, 'GET');
    } catch (err) {
      return err;
    }
    setItemInfo(data);
    setIsSuccessful(true);
  };

  const formatteDate = date => {
    const formatte = date => {
      return date < 10 ? '0' + date : date;
    };

    const year = date.getFullYear().toString().slice(2);
    const month = formatte(date.getMonth() + 1);
    const day = formatte(date.getDate());

    return `${day}/${month}/${year}`;
  };

  const submitForm = async data => {
    console.log(data);
    try {
      await sendRequest(`api/wishlist/update/${id}`, 'PATCH', data);
    } catch (err) {
      return;
    }
    setEditMode(false);
    getItemInfo();
    setIsSuccessful(true);
  };

  if (loading || !isSuccessful) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ResponsiveContainer sx={{ py: 4 }}>
        {editMode ? (
          <form onSubmit={handleSubmit(submitForm)}>
            <Stack m={2} spacing={2}>
              <Box
                sx={{
                  display: { xs: 'flex', sm: 'auto' },
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 0, sm: 4 },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 300,
                    width: { xs: '100%', sm: '50%', lg: '45%' },
                  }}
                  image={
                    itemInfo.image ||
                    'https://caracallacosmetici.com/wp-content/uploads/2019/03/no-img-placeholder.png'
                  }
                  alt={`${itemInfo.name} photo`}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: { xs: '100%', sm: '50%', lg: '55%' },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      mb: 3,
                    }}
                  >
                    <Controller
                      control={control}
                      name="name"
                      render={field => (
                        <TextField
                          variant="standard"
                          type="text"
                          label="Name"
                          value={field.value}
                          multiline
                          maxRows={3}
                          fullWidth={true}
                          onChange={field.onChange}
                          error={!!errors.name}
                          {...register('name', {
                            required: true,
                            minLength: 1,
                          })}
                          defaultValue={itemInfo.name}
                        />
                      )}
                    />
                  </Box>
                  <Box
                    sx={{
                      mb: 3,
                    }}
                  >
                    <Controller
                      control={control}
                      name="finalGoal"
                      render={field => (
                        <Input
                          variant="standard"
                          type="number"
                          value={field.value}
                          fullWidth={true}
                          onChange={field.onChange}
                          error={!!errors.finalGoal}
                          {...register('finalGoal', { required: true })}
                          inputProps={{ min: 1 }}
                          startAdornment={
                            <InputAdornment position="start">
                              Final goal:{' '}
                            </InputAdornment>
                          }
                          defaultValue={itemInfo.finalGoal}
                        />
                      )}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Controller
                      control={control}
                      name="description"
                      render={field => (
                        <TextField
                          variant="standard"
                          type="text"
                          label="Description"
                          value={field.value}
                          multiline
                          rows={6}
                          fullWidth={true}
                          onChange={field.onChange}
                          error={!!errors.description}
                          {...register('description')}
                          defaultValue={itemInfo.description}
                        />
                      )}
                    />
                  </Box>
                  <Box sx={{}}>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth={true}
                    >
                      Save
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      sx={{
                        background: theme => theme.palette.danger.main,
                        mt: 2,
                        '&:hover': {
                          background: theme => theme.palette.danger.dark,
                        },
                      }}
                      onClick={() => console.log('delete')}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </form>
        ) : (
          <Box
            sx={{
              display: { xs: 'flex', sm: 'auto' },
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 0, sm: 4 },
            }}
          >
            <CardMedia
              component="img"
              sx={{
                height: 300,
                width: { xs: '100%', sm: '50%', lg: '45%' },
              }}
              image={
                itemInfo.image ||
                'https://caracallacosmetici.com/wp-content/uploads/2019/03/no-img-placeholder.png'
              }
              alt={`${itemInfo.name} photo`}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: { xs: '100%', sm: '50%', lg: '55%' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  mb: 3,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: 24, sm: 20, md: 30 },
                    flexGrow: 1,
                    mb: { xs: 2, sm: 0 },
                    color: theme => theme.colors.dark,
                  }}
                >
                  {itemInfo.name}
                </Typography>
                <IconButton
                  onClick={() => setEditMode(true)}
                  title="Edit"
                  sx={{
                    height: 30,
                    width: 30,
                    ml: 2,
                    p: 0,
                    '&:hover': { color: theme => theme.palette.primary },
                  }}
                >
                  <EditIcon
                    sx={{
                      fontSize: 20,
                      color: 'inherit',
                    }}
                  />
                </IconButton>
              </Box>
              <Box
                sx={{
                  mb: 3,
                  borderBottom: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontStyle: 'italic',
                    fontWeight: 700,
                    color: theme => theme.colors.darkBlue,
                  }}
                >
                  Final goal: {itemInfo.finalGoal} ₴
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                {itemInfo.description ? (
                  <Typography sx={{ color: theme => theme.colors.dark }}>
                    {itemInfo.description}
                  </Typography>
                ) : (
                  <Typography sx={{ fontStyle: 'italic' }}>
                    No description...
                  </Typography>
                )}
              </Box>
              <Box
                sx={{
                  textAlign: 'right',
                  fontStyle: 'italic',
                }}
              >
                <Typography
                  sx={{ fontSize: '1rem', color: theme => theme.colors.dark }}
                >
                  Created on {formatteDate(new Date(itemInfo.createdAt))}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </ResponsiveContainer>
    </>
  );
};

export default WishlistItem;
