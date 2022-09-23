import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));

const Dashboard = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <>
        <link href='https://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet'></link>

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' sx={{ bgcolor: 'white', boxShadow: 0,}}>
                <Toolbar sx={{ bgcolor: 'white', p: 2, minWidth: 300, color: 'black' }}>
                    <Typography variant='h1' sx={{ fontFamily: 'Ubuntu', fontWeight: 700, fontSize: 46, flexGrow: 1 }}>Dashboard</Typography>
                    <Button 
                        variant="contained" 
                        color="inherit" 
                        sx={{ mr: 1 }} 
                        endIcon={<KeyboardArrowDownIcon />}
                        onClick={handleClick}>
                        Filter
                    </Button>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        >
                            <FormGroup sx={{ marginLeft: 2 }}>
                                <FormControlLabel control={<Switch defaultChecked />} label="Created by me" />
                                <FormControlLabel control={<Switch />} label="Co-owned by me" />
                                <FormControlLabel control={<Switch />} label="Hot baskets" />
                                <FormControlLabel control={<Switch />} label="Public baskets" />
                                <FormControlLabel control={<Switch />} label="Private baskets" />
                            </FormGroup>
                    </StyledMenu>
                    <Button variant="contained" color="success">Create new</Button>
                </Toolbar>
            </AppBar>
        </Box>

        <Box sx={{ bgcolor: 'white', boxShadow: 1, borderRadius: 3, p: 2, minWidth: 300, color: 'black', marginLeft: 5, marginRight: 5, borderColor: "black" }}>
            <p>There should be a dashboard</p>
        </Box>
        </>
    )
}

export default Dashboard