import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import BasketBox from '../components/BasketBox'
import { useTheme } from '@mui/material/styles';

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

const buttonOptions = [
  "Created by me",
  "Coowned by me",
  "Hot baskets",
  "Public baskets",
  "Private baskets"
]

const Dashboard = () => {
    const theme = useTheme();

    const [hiddenFilterAnchor, sethiddenFilterAnchor] = React.useState(null);
    const hiddenFilterMenuOpen = Boolean(hiddenFilterAnchor);

    const handleFilterClick = (event) => {
      sethiddenFilterAnchor(event.currentTarget);
    };
    const handleFilterClose = () => {
      sethiddenFilterAnchor(null);
    };

    const [buttonAnchorEl, setButtonAnchorEL] = React.useState(buttonOptions[0]);

    const [finishedBasketsState, setFinishedBasketsState] = React.useState(false);

    const { baskets } = useSelector(state => state.baskets);

    const testData = [
      {
        id: 0,
        name: 'Basket A',
        ownerId: 321312,
        description: "I am a good basket",
        finalGoal: 400,
        value: 200,
        expirationDate: '2022-09-30',
        isPublic: false,
        createdAt: '2022-09-20'
      },
      {
        id: 1,
        name: 'Basket B',
        ownerId: 12312,
        description: "I am a bad basket",
        finalGoal: 2000,
        value: 100,
        expirationDate: '2022-10-11',
        isPublic: false,
        createdAt: '2022-09-25'
      },
      {
        id: 2,
        name: 'Basket C',
        ownerId: 12312,
        description: "I am a bad basket",
        finalGoal: 2000,
        value: 100,
        expirationDate: '2022-10-11',
        isPublic: true,
        createdAt: '2022-09-25'
      },
    ]

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='static' sx={{ bgcolor: 'white', boxShadow: 0,}}>
            <Toolbar sx={{ bgcolor: 'white', p: 2, minWidth: 300, color: 'black' }}>
              <Typography variant='h1' sx={{ fontFamily: 'Ubuntu', fontWeight: 700, fontSize: 46, flexGrow: 1 }}>Dashboard</Typography>
              {
                buttonOptions.map((option) => {
                  return(<Button 
                    variant="contained" 
                    
                    sx={{ mr: 1, backgroundColor: option === buttonAnchorEl ? theme.colors.blue : theme.colors.yellow, color: option === buttonAnchorEl ? 'white' : 'black', '&:hover': { color: 'white' } }} 
                    onClick={() => { setButtonAnchorEL(option); }}>
                    {option}
                  </Button>)
                })
              }
              <Button 
                variant="contained" 
                color="inherit" 
                sx={{ mr: 1 }} 
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleFilterClick}>
                Filter
              </Button>
              <StyledMenu
                id="hidden-filter-menu"
                MenuListProps={{
                'aria-labelledby': 'hidden-filter-button',
                }}
                anchorEl={hiddenFilterAnchor}
                open={hiddenFilterMenuOpen}
                onClose={handleFilterClose}
                >
                <FormGroup sx={{ marginLeft: 2 }}>
                  <FormControlLabel control={<Switch checked={finishedBasketsState} onChange={() => { setFinishedBasketsState(!finishedBasketsState) }}/>} label="Finished" />
                </FormGroup>
              </StyledMenu>
              <Button variant="contained" sx={{ backgroundColor: "#58D68D", color: 'black', '&:hover': { backgroundColor: '#358255', color: "white" } }} >Create new</Button>
            </Toolbar>
          </AppBar>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', bgcolor: 'white', boxShadow: 1, borderRadius: 3, p: 2, minWidth: 300, color: 'black', marginLeft: 5, marginRight: 5, borderColor: "black" }}>
            { baskets().map((basket) => { return(<BasketBox data={basket} />) }) }
            { baskets().length === 0 && <Typography variant='h2' sx={{ fontFamily: 'Ubuntu', fontWeight: 500, fontSize: 30, flexGrow: 1 }}> No baskets available! </Typography> }
        </Box>
        </>
    )
}


export default Dashboard