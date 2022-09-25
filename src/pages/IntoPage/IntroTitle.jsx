import { Box, Typography } from '@mui/material'
import React from 'react'

const IntroTitle = () => {
  return (
    <Box>
        <Typography
            sx={{
              
                fontSize: '42px',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.12rem',
                textAlign: 'center',
                py: '15px'
            }}
        >
            Welcome!
        </Typography>
    </Box>
  )
}

export default IntroTitle