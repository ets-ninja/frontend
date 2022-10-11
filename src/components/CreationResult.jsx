import React from 'react'
import { Box, Typography, Button, CardMedia } from '@mui/material';
import LoadingSpinner from './UIElements/LoadingSpinner';


const CreationResult = ({handleReset, sucLabel, errLabel, loadLabel, errorState, loadingState, successState}) => {

  return (
    <Box sx={{height: '100%'}}>
        {loadingState === true  ? ( <LoadingSpinner />) : successState ? (<>
        <Typography sx={{ mt: 2, mb: 3, display: 'flex', justifyContent: 'center', textAlign: 'center', px: '10px'  }}>
            {sucLabel}
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
        <Button onClick={handleReset}>Go back</Button>
        </Box>
        </>) : <>
        <Typography sx={{ mt: 2, mb: 3, display: 'flex', justifyContent: 'center', textAlign: 'center', px: '10px'  }}>
            {errLabel}
        </Typography>
        <Box>
        <CardMedia 
        sx={{maxWidth: '300px', maxHeight: '400px', margin: '0 auto', p: '10px'}}
        component='img'
        src='https://media.tenor.com/fhuWmMp_jIIAAAAi/tears-cute.gif'
        />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleReset}>Go back</Button>
        </Box>
        </>}
    </Box>
  )
}

export default CreationResult