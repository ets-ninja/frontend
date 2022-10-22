import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CreationResult from './CreationResult'

const NotFound = () => {

  const navigate = useNavigate()  

  return (
    <Box sx={{
        margin: "0 auto",
        maxWidth: "1020px",
    }}>
        <Typography sx={{
            textAlign: 'center',            
            fontSize: { xs: '40px', sm: '56px', md: '60px' },
            fontWeight: "bold",
            color: 'gray'
        }}>404</Typography>
        <CreationResult handleReset={() => navigate('/')} 
        errLabel="Sorry, we couldn't find a page you looking for..."/>
    </Box>
  )
}

export default NotFound