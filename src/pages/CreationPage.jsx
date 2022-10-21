import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import CreationForm from '../components/forms/CreationForm';
import CreationForm2 from '../components/forms/CreationForm2';
import CreationForm3 from '../components/forms/CreationForm3';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBasket,
  cancelCreation,
  createBasket,
} from '../redux/basket/createBasketSlice';
import { deleteWishlistItem } from '../redux/wishlist/wishlistActions';
import { setItemToDelete } from '../redux/wishlist/wishlistSlice';
import CreationResult from '../components/CreationResult';
import { setError } from '../redux/snackbar/snackbarSlice';
import ReactGA from "react-ga4";

const steps = ['TextInfo', 'AdditionalSettings', 'Finishing!'];

const CreationPage = () => {
  ReactGA.send("pageview");
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

  const navigate = useNavigate();

  const basket = useSelector(selectBasket);
  const { itemToDelete: wishlistItemToDelete } = useSelector(
    state => state.wishlist,
  );
  const dispatch = useDispatch();

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (!basket.basketName || !basket.moneyGoal) {
      dispatch(setError('Basket name and money goal are required'));
      return;
    }
    if (isChecked1 && !basket.expirationDate) {
      dispatch(setError('If you set time limited you need to set expire date'));
      return;
    }
    if (basket.moneyGoal <= 0) {
      dispatch(setError('zero? -_-'));
      return;
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);

    if (activeStep === steps.length - 1) {
      dispatch(createBasket());
      if (wishlistItemToDelete.from === 'transformation') {
        dispatch(deleteWishlistItem({ id: wishlistItemToDelete.id }));
        dispatch(setItemToDelete({ id: null, from: '' }));
      }
      setIsChecked1(false);
      setIsChecked3(false);
      ReactGA.event({
        category: "Jar",
        action: "Jar Creation",
        label: "User created a jar", // optional
        value: 99, // optional, must be a number
      });
    }
  };

  const handleBack = () => {
    if (isChecked1 && !basket.expirationDate) {
      setIsChecked1(false);
    }
    if (activeStep === 0) {
      dispatch(cancelCreation());
      setIsChecked1(false);
      setIsChecked3(false);
      navigate('/dashboard');
      return;
    }
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    navigate('/dashboard');
  };

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Stepper activeStep={activeStep} sx={{ mb: '50px', mx: '10px' }}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
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

      {/* main content */}
      {activeStep === steps.length ? (
        <CreationResult
          sucLabel="All steps completed - basket created!"
          errLabel="Uhh, something went wrong..."
          loadLabel="Loading..."
          handleReset={handleReset}
          errorState={basket.error}
          loadingState={basket.loading}
          successState={basket.success}
        />
      ) : (
        <React.Fragment>
          {activeStep === 0 ? (
            <CreationForm />
          ) : activeStep === 1 ? (
            <CreationForm2
              setIsChecked1={setIsChecked1}
              isChecked1={isChecked1}
              setIsChecked2={setIsChecked2}
              isChecked2={isChecked2}
            />
          ) : (
            <CreationForm3
              setIsChecked3={setIsChecked3}
              isChecked3={isChecked3}
            />
          )}

          {/* KNOPKI */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              pt: 2,
              mx: '10px',
              mb: '25px',
            }}
          >
            <Button
              color="inherit"
              onClick={handleBack}
              sx={{ mr: 1 }}
              size={'large'}
            >
              {activeStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button
              size={'large'}
              variant="outlined"
              onClick={handleNext}
              color={activeStep === steps.length - 1 ? 'success' : 'primary'}
            >
              {activeStep === steps.length - 1 ? 'Create' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default CreationPage;
