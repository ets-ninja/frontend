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
      console.log(data);
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
    let result = {};
    result.name = data.name;
    result.finalGoal = data.finalGoal;
    result.description = data.description;
    result.image = data.image;
    try {
      await sendRequest(`api/wishlist/update/:id`, 'PATCH', data);
    } catch (err) {
      return;
    }
    setIsSuccessful(true);
  };

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
                      name="name"
                      control={control}
                      defaultValue=""
                      rules={{ required: 'Min length 1', minLength: 1 }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="text"
                          value={itemInfo.name}
                          variant="standard"
                          multiline
                          maxRows={4}
                          fullWidth={true}
                          {...register('name')}
                          label="Name"
                          autoComplete="name"
                          error={!!errors.name}
                          onChange={e => field.onChange(e.target.value)}
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
                      name="finalGoal"
                      control={control}
                      rules={{
                        required: 'Value is requested',
                        pattern: '[0-9]+',
                      }}
                      render={({ field }) => (
                        <Input
                          variant="standard"
                          type="number"
                          value={itemInfo.finalGoal}
                          multiline
                          maxRows={1}
                          fullWidth={true}
                          {...register('finalGoal')}
                          autoComplete="finalGoal"
                          error={!!errors.finalGoal}
                          onChange={e => field.onChange(e.target.value)}
                          startAdornment={
                            <InputAdornment position="start">
                              Final goal:{' '}
                            </InputAdornment>
                          }
                        />
                      )}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      type="text"
                      value={itemInfo.description}
                      variant="standard"
                      multiline
                      rows={7}
                      fullWidth={true}
                      {...register('description', {})}
                      label="Description"
                      autoComplete="description"
                      error={!!errors.description}
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
                      sx={{ backgroundColor: '#f84d33', mt: 2 }}
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
                  Final goal: {itemInfo.finalGoal}
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
