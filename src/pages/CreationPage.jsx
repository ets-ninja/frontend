import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from "react-router-dom";import CreationForm from '../components/forms/CreationForm';
import CreationForm2 from '../components/forms/CreationForm2';
import CreationForm3 from '../components/forms/CreationForm3';
import { useState } from 'react';
// import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { pushBasketToSomewhere, selectBasket, cancelCreation} from '../redux/basket/createBasketSlice'
import { CardMedia } from '@mui/material';
import ErrorMessage from '../components/UIElements/ErrorMessage';
import { setProjectAnnotations } from '@storybook/react';
import { setError } from '../redux/request/requestSlice';




const steps = ['TextInfo', 'AdditionSettings', 'Finishing!'];

const CreationPage = () => {
  
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

  const navigate = useNavigate()

  const basket = useSelector(selectBasket);
  const dispatch = useDispatch()

  const isStepOptional = step => {
    return step === 1;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {

    if (!basket.basketName || !basket.moneyGoal){
      dispatch(setError('Basket name and money goal are required'))
      return
    } 
    if (isChecked1 && !basket.expirationDate){
      dispatch(setError('If you set time limited you need to set ex of limits'))
      return
    }
    if (basket.moneyGoal <= 0){
      alert('zero? -_-')
      return
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);

    if (activeStep === steps.length - 1) {
      dispatch(pushBasketToSomewhere())
      setIsChecked1(false)
      setIsChecked3(false)
     }
  };



  const handleBack = () => {
    if (isChecked1 && !basket.expirationDate){
      setIsChecked1(false)

    }
    if (activeStep === 0) {
      dispatch(cancelCreation())
      setIsChecked1(false)
      setIsChecked3(false)
      navigate('/')
      return
    }
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

 
  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Stepper activeStep={activeStep} sx={{ mb: '50px', mx: '10px' }}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography
          //       sx={{ fontSize: '12px !important' }}
          //       variant="caption"
          //     >
          //       Optional
          //     </Typography>
          //   );
          // }
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
        <Box sx={{height: '100%'}}>
          <Typography sx={{ mt: 2, mb: 3, display: 'flex', justifyContent: 'center', textAlign: 'center', px: '10px'  }}>
            All steps completed - you&apos;re finished, basket is created!
          </Typography>
          <Box>
            <CardMedia 
            sx={{maxWidth: '300px', maxHeight: '400px', margin: '0 auto', p: '10px'}}
            component='img'
            src='https://papik.pro/en/uploads/posts/2022-06/1654763453_11-papik-pro-p-cute-piggy-drawing-11.png'
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            {/* could be icon */}
            <ErrorMessage />
            <Button onClick={handleReset}>Go back</Button>
          </Box>
        </Box>
      ) : (
        <React.Fragment>
          {/* TODO this !  */}
          {activeStep === 0 ? (
            <CreationForm/>
          ) : activeStep === 1 ? (
            <CreationForm2               
              setIsChecked1={setIsChecked1}
              isChecked1={isChecked1}
            />
          ) : (
            <CreationForm3 
              setIsChecked3={setIsChecked3}
              isChecked3={isChecked3}
            />
          )}

          {/* <Typography sx={{ mt: 2, mb: 1 }}><Testing /> {activeStep + 1}</Typography> */}

          {/* KNOPKI:) */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2,mx: '10px', mb: '25px'}}>
            <Button
              color="inherit"
              // disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              size={'large'}
            >
            {activeStep === 0 ? "Cancel" : "Back"}
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

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
