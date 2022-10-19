import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  MobileStepper,
  CardMedia,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import LoadingSpinner from '@components/UIElements/LoadingSpinner';
import { Controller, useForm } from 'react-hook-form';
import useModal from '@hooks/useModal';

import { createWishlistItem } from '@redux/wishlist/wishlistActions';
import {
  setWishitemPhoto,
  setSuccess,
  setLoading,
} from '@redux/wishlist/wishlistSlice';

const steps = ['Name and Goal', 'Image', 'Check and create'];

const WishlistItemStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const maxSteps = steps.length;

  const theme = useTheme();
  const navigate = useNavigate();
  const modal = useModal();
  const dispatch = useDispatch();

  const {
    newWishliItemPhoto: image,
    loading,
    success,
  } = useSelector(state => state.wishlist);

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(setWishitemPhoto(''));
    dispatch(setSuccess(false));
  }, []);

  const isStepOptional = step => {
    return step === 1;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const submitForm = async data => {
    data.name = data.name.trim();
    data.image = image;
    if (activeStep === 2) {
      await dispatch(createWishlistItem({ data }));
    } else {
      handleNext();
    }
  };

  const resetStateStatusesAndRedirect = () => {
    dispatch(setWishitemPhoto(''));
    dispatch(setSuccess(false));
    dispatch(setLoading(true));
    navigate('/wishlist');
  };

  useEffect(() => {
    if (success) {
      resetStateStatusesAndRedirect();
    }
  }, [success]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Stepper
        activeStep={activeStep}
        sx={{ display: { xs: 'none', md: 'flex' } }}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </Fragment>
      ) : (
        <Fragment>
          <form onSubmit={handleSubmit(submitForm)}>
            <Stack alignItems="center" sx={{ pt: 4 }}>
              {activeStep === 0 ? (
                <Box sx={{ width: { xs: '100%', sm: 500 } }}>
                  <Typography
                    sx={{ mb: 3, fontStyle: 'italic', fontSize: '0.9rem' }}
                  >
                    Please note that all fields marked as * are required
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Controller
                      control={control}
                      name="name"
                      render={field => (
                        <TextField
                          variant="standard"
                          type="text"
                          label="Name*"
                          value={field.value}
                          multiline
                          maxRows={3}
                          fullWidth={true}
                          onChange={field.onChange}
                          error={!!errors.name}
                          {...register('name', {
                            required: true,
                            minLength: 1,
                            maxLength: {
                              value: 80,
                              message:
                                'Name is too long. It should be shorter than 80 characters',
                            },
                          })}
                          defaultValue=""
                        />
                      )}
                    />
                    <Typography
                      sx={{
                        color: theme => theme.palette.danger.main,
                        fontSize: '.7rem',
                      }}
                    >
                      {errors?.name?.message}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Controller
                      control={control}
                      name="finalGoal"
                      render={field => (
                        <TextField
                          variant="standard"
                          type="number"
                          min={1}
                          label="Final goal, $*"
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
                            max: {
                              value: 10000000,
                              message:
                                'Final goal should be less than 10 000 000',
                            },
                          })}
                        />
                      )}
                    />
                    <Typography
                      sx={{
                        color: theme => theme.palette.danger.main,
                        fontSize: '.7rem',
                      }}
                    >
                      {errors?.finalGoal?.message}
                    </Typography>
                  </Box>
                  <Box>
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
                          defaultValue=""
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
                </Box>
              ) : activeStep === 1 ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    wisth: '100%',
                    maxWidth: 600,
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: { sm: 280, md: 205, lg: 275, xl: 340 },
                      width: { sm: '100%' },
                    }}
                    image={
                      image ||
                      'https://caracallacosmetici.com/wp-content/uploads/2019/03/no-img-placeholder.png'
                    }
                    alt="Your photo"
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ color: theme => theme.colors.dark, mt: 3 }}
                    startIcon={<AddAPhotoIcon />}
                    onClick={() =>
                      modal.open('update-photo', {
                        width: 250,
                        height: 141,
                        aspect: 16 / 9,
                        canvasBorderRadius: 0,
                        path: 'setWishitemPhoto',
                      })
                    }
                  >
                    Choose photo for your wish
                  </Button>
                  {image && (
                    <Button
                      color="danger"
                      variant="outlined"
                      size="small"
                      sx={{
                        mt: 2,
                        color: theme => theme.colors.dark,
                        width: '200px',
                        borderColor: 'transparent',
                      }}
                      onClick={() => dispatch(setWishitemPhoto(''))}
                    >
                      Delete
                    </Button>
                  )}
                </Box>
              ) : (
                <Box>
                  <Typography
                    sx={{ mb: 3, fontStyle: 'italic', fontSize: '1rem' }}
                  >
                    Please review information that you have entered. If anything
                    needs to be fixed, please go back.
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      gap: 4,
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        height: { sm: 280, md: 205, lg: 275, xl: 340 },
                        width: { xs: '100%', md: '50%' },
                      }}
                      image={
                        image ||
                        'https://caracallacosmetici.com/wp-content/uploads/2019/03/no-img-placeholder.png'
                      }
                      alt="Your photo"
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          mb: { xs: 2, sm: 0 },
                          color: theme => theme.colors.dark,
                        }}
                      >
                        <b>Name:</b> {getValues('name')}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontStyle: 'italic',
                          color: theme => theme.colors.darkBlue,
                        }}
                      >
                        <b>Final goal:</b> ${getValues('finalGoal')}
                      </Typography>
                      {getValues('description').length ? (
                        <Typography
                          sx={{
                            color: theme => theme.colors.dark,
                            wordBreak: 'break-word',
                          }}
                        >
                          <b>Description:</b> {getValues('description')}
                        </Typography>
                      ) : (
                        <Typography sx={{ fontStyle: 'italic' }}>
                          No description added...
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              )}
            </Stack>
            {/* Desktop controls */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'row',
                pt: 4,
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button type="submit" color="primary" variant="contained">
                  Finish
                </Button>
              ) : (
                <Button type="submit">Next</Button>
              )}
            </Box>
            {/* Mobile controls */}
            <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 4 }}>
              <MobileStepper
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                xs={{ px: 0 }}
                nextButton={
                  <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                  >
                    Next
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowRight />
                    ) : (
                      <KeyboardArrowLeft />
                    )}
                    Back
                  </Button>
                }
              />
            </Box>
          </form>
        </Fragment>
      )}
    </Box>
  );
};

export default WishlistItemStepper;
