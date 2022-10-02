import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 40,
    borderRadius: 20,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 20,
      background: 'linear-gradient(270.27deg, #58D68D 1.94%, rgba(88, 214, 141, 0.51) 99.95%);'
    },
  }));


const Basket = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: 3, pl: 1, pr: 1 }}>
            <IconButton sx={{ height: 35, width: 35, mt: 1 }} component={Link} to="/">
                <ChevronLeftIcon fontSize="large" />
            </IconButton>
            <Box sx={{ ml: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography variant='h1' sx={{ fontFamily: 'Ubuntu', fontWeight: 700, fontSize: 40}}>Basket name</Typography>
                    <IconButton sx={{ height: 45, width: 45, ml: 3 }} component={Link}>
                        <EditIcon sx={{ fontSize: 32 }} />
                    </IconButton>
                </Box>
                <Card fontSize="large" sx={{ width: 300, minHeight: 450, borderRadius: 4, boxShadow: 4, mt: 2, padding: 2 }}>
                    <Typography variant='h3' sx={{ fontWeight: 500, fontSize: 36 }}>Information</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                        <Typography variant='h3'>Type: Public</Typography>
                        <IconButton sx={{ height: 32, width: 32, mr: 2}} component={Link}>
                            <EditIcon sx={{ fontSize: 25 }} />
                        </IconButton>
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant='h3'>Creation date:</Typography>
                            <Typography variant='h3'>05/09/2022</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant='h3'>Expiration date:</Typography>
                            <Typography variant='h3'>22/09/2022</Typography>
                        </Box>
                        <IconButton sx={{ height: 32, width: 32, mr: 2, mt: 1}} component={Link}>
                            <EditIcon sx={{ fontSize: 25 }} />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                        <Typography variant='h3'>Time left: {new Date(Date.parse('2022-09-30') - Date.now()).getDate()} days</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                        <Typography variant='h3'>Collected: 200$</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                        <Typography variant='h3' >Goal: 800$</Typography>
                        <IconButton sx={{ height: 32, width: 32, mr: 2, mt: -0.3}} component={Link}>
                            <EditIcon sx={{ fontSize: 25 }} />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant='h3'>Description:</Typography>
                            <Typography variant='h3'>We want to buy a table</Typography>
                        </Box>
                        <IconButton sx={{ height: 32, width: 32, mr: 2}} component={Link}>
                            <EditIcon sx={{ fontSize: 25 }} />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                        <Typography variant='h3'>Owner: admin</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                        <Typography variant='h3'>Participants:</Typography>
                        <Button variant="contained" color="inherit" sx={{ height: 30, mr: 2 }}>Show</Button>
                    </Box>
                </Card>
                <Button sx={{ width: 330, fontSize: 35, mt: 3, mb: 3, borderRadius: 3, backgroundColor: "#58D68D", boxShadow: 5, color: 'black', '&:hover': { backgroundColor: '#358255', color: "white" } }}>
                    Donate
                </Button>
            </Box>
            <Box sx={{ flexGrow: 1, ml: 2, mr: 10, mt: 0.5, maxWidth: 1350 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <BorderLinearProgress sx={{ maxWidth: 1250 }} variant="determinate" value={50} />
                    <Typography variant='h3'>800$</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Basket