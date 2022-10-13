import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import request from '../hooks/useRequest';

const WishlistItemStepper = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const { loading, sendRequest } = request();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

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
    if (activeStep === 2) {
      try {
        const response = await sendRequest(`api/wishlist`, 'POST', data);
        if (response.id) {
          navigate('/wishlist');
        }
      } catch (err) {
        return err;
      }
    } else {
      handleNext();
    }
  };

  return (
    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
      <Stepper activeStep={activeStep}>
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
                          })}
                          defaultValue=""
                        />
                      )}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Controller
                      control={control}
                      name="finalGoal"
                      render={field => (
                        <TextField
                          variant="standard"
                          type="number"
                          label="Final goal*"
                          value={field.value}
                          fullWidth={true}
                          onChange={field.onChange}
                          error={!!errors.finalGoal}
                          {...register('finalGoal', {
                            required: true,
                            min: 1,
                          })}
                          defaultValue=""
                        />
                      )}
                    />
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
                          {...register('description')}
                          defaultValue=""
                        />
                      )}
                    />
                  </Box>
                </Box>
              ) : activeStep === 1 ? (
                'step 2'
              ) : (
                'step 3'
              )}
            </Stack>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
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
          </form>
        </Fragment>
      )}
    </Box>
  );
};

export default WishlistItemStepper;
