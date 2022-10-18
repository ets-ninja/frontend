import React, { useEffect, useState }  from 'react';
import BasketBox from './BasketBox';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import StyledMenu from './StyledMenu';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import { changePage, changeType, changeOrder } from '../../redux/basket/basketSlice'
import { Link } from 'react-router-dom';

import { get_owner_baskets, get_coowner_baskets, get_public_baskets, get_private_baskets } from '../../redux/basket/basketActions';

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const buttonOptions = [
  "Created by me",
  "Coowned by me",
  "Public baskets",
  "Private baskets"
]

const orderOptions = [
  "Newest to oldest",
  "Oldest to newest",
  "Divider",
  "Expensive to cheap",
  "Cheap to expensive",
  "Divider",
  "Soon to expire",
  "Far to expire"
]

const BasketDashboardHeader = () => {
  const { page } = useSelector(state => state.basket.paginationData);

  const [hiddenFilterAnchor, sethiddenFilterAnchor] = useState(null);
  const hiddenFilterMenuOpen = Boolean(hiddenFilterAnchor);

  const handleFilterClick = (event) => {
    sethiddenFilterAnchor(event.currentTarget);
  };
  const handleFilterClose = () => {
    sethiddenFilterAnchor(null);
  };

  const { currentType, currentOrder }= useSelector(state => state.basket.paginationData);
  const [archivedBasketsState, setarchivedBasketsState] = useState(false);

  const dispatch = useDispatch();

  const handleBasketTypeButton = async (event) => {
    dispatch(changeType({ value: event.target.value} ));
    dispatch(changePage({ value: 1 }));
  }

  const handleBasketOrderButton = async (event) => {
    dispatch(changeOrder({ value: event.target.value} ));
    dispatch(changePage({ value: 1 }));
  }

  const executeButtonDispatch = () => {
    if(currentType === buttonOptions[0]){
      dispatch(get_owner_baskets({ archived: archivedBasketsState, page: page, order: currentOrder }));
    }
    if(currentType === buttonOptions[1]){
      dispatch(get_coowner_baskets({ archived: archivedBasketsState, page: page, order: currentOrder }));
    }
    if(currentType === buttonOptions[2]){
      dispatch(get_public_baskets({ archived: archivedBasketsState, page: page, order: currentOrder }));
    }
    if(currentType === buttonOptions[3]){
      dispatch(get_private_baskets({ archived: archivedBasketsState, page: page, order: currentOrder }));
    }
  }

  useEffect(() => {
    executeButtonDispatch();
  }, [, page, currentType, currentOrder])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ bgcolor: 'white', boxShadow: 0,}}>
        <Toolbar sx={{ bgcolor: 'white', p: 2, minWidth: 300, color: 'black', flexDirection: { xxs: 'column',xs: 'column', sm: 'column', md: 'row' }, }}>
          <Typography variant='h1' sx={{ fontFamily: 'Ubuntu', fontWeight: 700, fontSize: 46, flexGrow: 1, mb: { sm: 2, md: 0 } }}>Dashboard</Typography>
          <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel id="basket-type-label">Basket Type</InputLabel>
            <Select
              labelId="basket-type-label"
              id="basket-type-name"
              value={currentType}
              onChange={handleBasketTypeButton}
              input={<OutlinedInput label="Basket Type" />}
              sx={{ height: 40 }}
              MenuProps={MenuProps}
            >
              {buttonOptions.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 250 }}>
            <InputLabel id="basket-order-label">Order</InputLabel>
            <Select
              labelId="basket-order-label"
              id="basket-order-name"
              value={currentOrder}
              onChange={handleBasketOrderButton}
              input={<OutlinedInput label="Order" />}
              sx={{ height: 40 }}
              MenuProps={MenuProps}
            >
              {orderOptions.map((option) => (
                option !== "Divider" ? 
                <MenuItem
                  key={option}
                  value={option}
                >
                  {option}
                </MenuItem>
                : <Divider variant="middle" />
              ))}
            </Select>
          </FormControl>
          <Button 
            variant="contained" 
            color="inherit" 
            sx={{ mr: 1, mb: { xxs: 2, xs: 2, sm: 2, md: 0 } }} 
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
              <FormControlLabel control={<Switch checked={archivedBasketsState} onChange={() => { setarchivedBasketsState(!archivedBasketsState) }}/>} label="Archived" />
            </FormGroup>
          </StyledMenu>
          <Button component={Link} to='/creation' variant="contained" sx={{ backgroundColor: "#58D68D", color: 'black', '&:hover': { backgroundColor: '#358255', color: "white", mb: { sm: 2, md: 0 } } }} >Create new</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default BasketDashboardHeader;
