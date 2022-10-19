import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import CloseIcon from '@mui/icons-material/Close';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';
import { Controller, useForm } from 'react-hook-form';
import {
  getSingleWishlistItem,
  deleteWishlistItem,
  updateWishlistItem,
} from '../redux/wishlist/wishlistActions';
import {
  setSuccess,
  setLoading,
  setItemToDelete,
} from '../redux/wishlist/wishlistSlice';
import {
  setBasketName,
  setDescription,
  setMoneyGoal,
  setPhotoTag,
} from '../redux/basket/createBasketSlice';

import useModal from '../hooks/useModal';

const WishlistItem = () => {
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();
  const modal = useModal();

  let { id } = useParams();

  const {
    success,
    loading,
    singleItemInfo: itemInfo,
  } = useSelector(state => state.wishlist);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(setItemToDelete(null));
    dispatch(setSuccess(false));
  }, []);

  useEffect(() => {
    getItemInfo();
  }, [dispatch]);

  const getItemInfo = async () => {
    await dispatch(getSingleWishlistItem({ id }));
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
    setEditMode(false);
    await dispatch(updateWishlistItem({ id, data }));
  };

  const removeItem = async () => {
    await dispatch(deleteWishlistItem({ id }));
  };

  const resetStateStatusAndRedirect = () => {
    dispatch(setSuccess(false));
    dispatch(setLoading(true));
    navigate('/wishlist');
  };

  useEffect(() => {
    if (success) {
      resetStateStatusAndRedirect();
    }
  }, [success]);

  const handleTransformButton = () => {
    dispatch(setBasketName(itemInfo.name));
    dispatch(setMoneyGoal(itemInfo.finalGoal));
    dispatch(setDescription(itemInfo.description));
    dispatch(setPhotoTag(itemInfo.image));
    dispatch(setItemToDelete(itemInfo._id));
    navigate('/creation');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ResponsiveContainer sx={{ py: 4 }}>
        {editMode ? (
          <form onSubmit={handleSubmit(submitForm)}>
            <Stack alignItems="center">
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                }}
              >
                <IconButton
                  size="large"
                  aria-label="editClose"
                  title="Close editing"
                  onClick={() => setEditMode(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: { xs: 'flex' },
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: { xs: 'center', md: 'initial' },
                  gap: { xs: 6, md: 4 },
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    width: { xs: '100%', md: '45%' },
                    maxWidth: { xs: 500, md: 'initial' },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: { sm: 280, md: 205, lg: 275, xl: 340 },
                      width: { sm: '100%' },
                    }}
                    image={
                      itemInfo.image ||
                      'https://caracallacosmetici.com/wp-content/uploads/2019/03/no-img-placeholder.png'
                    }
                    alt={`${itemInfo.name} photo`}
                  />
                  <Button
                    variant="text"
                    sx={{
                      color: theme => theme.colors.dark,
                      boxShadow:
                        '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);',
                      '&:hover': {
                        boxShadow:
                          '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);',
                      },
                    }}
                    onClick={() =>
                      modal.open('update-photo', {
                        width: 250,
                        height: 141,
                        aspect: 16 / 9,
                        canvasBorderRadius: 0,
                        path: 'updateWishItemPhoto',
                        wishItemId: id,
                      })
                    }
                  >
                    Change photo
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: { xs: '100%', md: '55%' },
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
                          min="1"
                          step="1"
                          value={field.value}
                          fullWidth={true}
                          inputProps={{ min: 1, step: 'any' }}
                          onChange={field.onChange}
                          error={!!errors.finalGoal}
                          {...register('finalGoal', {
                            required: true,
                            min: {
                              value: 1,
                              message: 'Final goal should be greater than 0',
                            },
                          })}
                          startAdornment={
                            <InputAdornment position="start">
                              Final goal: ${' '}
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
                          {...register('description', {
                            maxLength: {
                              value: 1000,
                              message:
                                'Description is too long. It should be shorter than 1000 characters',
                            },
                          })}
                          defaultValue={itemInfo.description}
                        />
                      )}
                    />
                    <Typography
                      sx={{
                        color: theme => theme.palette.danger.main,
                        fontSize: '.7rem',
                      }}
                    >
                      {errors?.description?.message}
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth={true}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Button
                color="danger"
                variant="contained"
                sx={{
                  mt: 10,
                  color: theme => theme.colors.white,
                  width: '200px',
                }}
                onClick={removeItem}
              >
                Delete
              </Button>
            </Stack>
          </form>
        ) : (
          <>
            <Box
              sx={{
                display: { xs: 'flex' },
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Box
                sx={{
                  display: { xs: 'flex' },
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: { xs: 'center', md: 'initial' },
                  gap: { xs: 3, md: 4 },
                  width: '100%',
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: { xs: 170, sm: 280, md: 215, lg: 280, xl: 340 },
                    width: { xs: 310, sm: '100%', md: '45%' },
                    maxWidth: { xs: 500, md: 'initial' },
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
                    width: { xs: '100%', md: '55%' },
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
                      Final goal: ${itemInfo.finalGoal}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    {itemInfo.description ? (
                      <Typography
                        sx={{
                          color: theme => theme.colors.dark,
                          wordBreak: 'break-word',
                        }}
                      >
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
                      sx={{
                        fontSize: '1rem',
                        color: theme => theme.colors.dark,
                      }}
                    >
                      Created on {formatteDate(new Date(itemInfo.createdAt))}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                title="Transfer this wish to the banka"
                endIcon={<CurrencyExchangeIcon />}
                onClick={handleTransformButton}
              >
                Make your wish a real goal!
              </Button>
            </Box>
          </>
        )}
      </ResponsiveContainer>
    </>
  );
};

export default WishlistItem;
