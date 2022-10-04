import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import ResponsiveContainer from '../components/styled/ResponsiveContainer';
import StyledDropDownMenu from '../components/styled/StyledDropDownMenu';

import WishlistCard from '../components/WishlistCard';

import { getWishlistItems } from '../redux/wishlist/wishlistActions';

const sortOptions = ['Date created', 'Final Goal'];
const sortOrderValues = ['ascending', 'descending'];

const Wishlist = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [sortOption, setSortOption] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const {
    loading,
    error,
    items: wishlistItems,
  } = useSelector(state => state.wishlist);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlistItems());
  }, [dispatch]);

  const handleOpenSortMenu = e => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseSortMenu = () => {
    setAnchorElNav(null);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <ResponsiveContainer>
        {error && <h1>Error</h1>}
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 0 }}>
            <Toolbar
              sx={{
                bgcolor: 'white',
                py: 2,
                px: { sm: 0 },
                color: 'black',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 700,
                  fontSize: 46,
                  flexGrow: 1,
                  mb: { xs: 2, sm: 0 },
                }}
              >
                Wishlist
              </Typography>
              <Box sx={{ display: { xs: 'flex', sm: 'auto' } }}>
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{ mr: 1 }}
                  endIcon={<KeyboardArrowDownIcon />}
                  onClick={handleOpenSortMenu}
                >
                  Sort by
                </Button>
                <StyledDropDownMenu
                  id="hidden-filter-menu"
                  MenuListProps={{
                    'aria-labelledby': 'hidden-filter-button',
                  }}
                  anchorEl={anchorElNav}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseSortMenu}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {sortOptions.map(option => {
                      return (
                        <Button
                          key={option}
                          onClick={() => {
                            handleCloseSortMenu();
                            setSortOption(option);
                          }}
                          variant="text"
                          fullWidth={true}
                          sx={{
                            justifyContent: 'flex-start',
                            textTransform: 'none',
                            color: 'rgb(55, 65, 81)',
                          }}
                          endIcon={sortOption === option ? <CheckIcon /> : ''}
                        >
                          {option}
                        </Button>
                      );
                    })}
                    <Divider />
                    {sortOrderValues.map(order => {
                      return (
                        <Button
                          key={order}
                          onClick={() => {
                            handleCloseSortMenu();
                            setSortOrder(order);
                          }}
                          variant="text"
                          fullWidth={true}
                          sx={{
                            justifyContent: 'flex-start',
                            textTransform: 'none',
                            color: 'rgb(55, 65, 81)',
                          }}
                          endIcon={sortOrder === order ? <CheckIcon /> : ''}
                        >
                          In {order} order
                        </Button>
                      );
                    })}
                  </Box>
                </StyledDropDownMenu>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#58D68D',
                    color: 'black',
                    '&:hover': { backgroundColor: '#358255', color: 'white' },
                  }}
                >
                  Create new
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            rowGap: { xs: 2, md: 3 },
            columnGap: { lg: '2.66%', md: '5%', sm: '10%' },
            justifyContent: 'flex-start',
            bgcolor: 'white',
            boxShadow: 1,
            borderRadius: 3,
            py: 3,
            px: 3,
            borderColor: 'black',
          }}
        >
          {Object.values(wishlistItems).map(item => {
            return <WishlistCard key={item._id} itemInfo={item} />;
          })}
          {Object.values(wishlistItems).length === 0 && (
            <Typography
              variant="h2"
              sx={{
                fontWeight: 500,
                fontSize: 30,
                flexGrow: 1,
              }}
            >
              No items in wishlist available!
            </Typography>
          )}
        </Box>
      </ResponsiveContainer>
    </>
  );
};

export default Wishlist;
