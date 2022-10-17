import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import ResponsiveContainer from '../components/styled/ResponsiveContainer';
import StyledDropDownMenu from '../components/styled/StyledDropDownMenu';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';

import WishlistCard from '../components/WishlistCard';
import BasicPagination from '../components/BasicPagination';

import {
  getSortedWishlistItems,
  deleteWishlistItem,
} from '../redux/wishlist/wishlistActions';
import {
  setSortingOptions,
  setWishlistPage,
  setItemToDelete,
  setLoading,
} from '../redux/wishlist/wishlistSlice';

const sortFields = [
  { name: 'Date created', dbName: 'createdAt' },
  { name: 'Final Goal', dbName: 'finalGoal' },
];
const sortOrderValues = [
  { name: 'ascending', dbName: '1' },
  { name: 'descending', dbName: '-1' },
];

const Wishlist = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const navigate = useNavigate();

  const {
    loading,
    items: wishlistItems,
    totalItemsQuantity,
    sortingOptions,
    pageCount: pages,
    activePage,
    itemToDelete,
  } = useSelector(state => state.wishlist);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setItemToDelete(null));
    dispatch(setLoading(true));
  }, []);

  useEffect(() => {
    setSortField(sortingOptions.field);
    setSortOrder(sortingOptions.order);
    setPage(activePage);
    setPageCount(pages);
  }, [dispatch, activePage, pages]);

  const handleOpenSortMenu = e => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseSortMenu = () => {
    setAnchorElNav(null);
  };

  const sortItems = async () => {
    await dispatch(
      getSortedWishlistItems({
        options: { page, field: sortField, order: sortOrder },
      }),
    );
  };

  const updateItems = async () => {
    if (sortField) {
      await sortItems();
      await dispatch(
        setSortingOptions({
          field: sortField,
          order: sortOrder,
        }),
      );
    }
  };

  useEffect(() => {
    updateItems();
  }, [dispatch, sortField, sortOrder, page]);

  const handleChangePage = page => {
    setPage(page);
    dispatch(setWishlistPage(page));
  };

  const removeItem = async () => {
    await dispatch(deleteWishlistItem({ id: itemToDelete }));
    if (wishlistItems.length === 1 && pageCount !== 1) {
      handleChangePage(page - 1);
      setPageCount(pageCount - 1);
    }
    await sortItems();
  };

  useEffect(() => {
    if (itemToDelete) {
      removeItem();
    }
    dispatch(setItemToDelete(null));
  }, [itemToDelete]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ResponsiveContainer>
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
                  color: theme => theme.colors.dark,
                }}
              >
                Wishlist
              </Typography>
              <Box sx={{ display: { xs: 'flex', sm: 'auto' } }}>
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{ mr: 1, color: theme => theme.colors.dark }}
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
                    {sortFields.map(field => {
                      return (
                        <Button
                          key={field.name}
                          onClick={() => {
                            handleCloseSortMenu();
                            setSortField(field.dbName);
                          }}
                          variant="text"
                          fullWidth={true}
                          sx={{
                            justifyContent: 'flex-start',
                            textTransform: 'none',
                            color: 'rgb(55, 65, 81)',
                          }}
                          endIcon={
                            sortField === field.dbName ? <CheckIcon /> : ''
                          }
                        >
                          {field.name}
                        </Button>
                      );
                    })}
                    <Divider />
                    {sortOrderValues.map(order => {
                      return (
                        <Button
                          key={order.name}
                          onClick={() => {
                            handleCloseSortMenu();
                            setSortOrder(order.dbName);
                          }}
                          variant="text"
                          fullWidth={true}
                          sx={{
                            justifyContent: 'flex-start',
                            textTransform: 'none',
                            color: 'rgb(55, 65, 81)',
                          }}
                          endIcon={
                            sortOrder === order.dbName ? <CheckIcon /> : ''
                          }
                        >
                          In {order.name} order
                        </Button>
                      );
                    })}
                  </Box>
                </StyledDropDownMenu>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    color: theme => theme.colors.dark,
                  }}
                  onClick={() => navigate('/wishlist-create-item')}
                >
                  Create new
                </Button>
              </Box>
            </Toolbar>
            <Typography
              variant="p"
              sx={{
                fontSize: 20,
                color: theme => theme.colors.dark,
              }}
            >
              Total: {totalItemsQuantity || 0} items
            </Typography>
          </AppBar>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: { xs: '0' },
            justifyContent: { xs: 'center', sm: 'flex-start' },
            bgcolor: 'white',
            borderRadius: 3,
            py: 3,
            boxShadow: 0,
            borderWidthTop: '1px',
            borderWidthLeft: '1px',
            borderColor: 'rgba(0, 0, 0, 0.3)',
          }}
        >
          {wishlistItems.map(item => {
            return (
              <WishlistCard
                key={item._id}
                itemInfo={item}
                removeItem={removeItem}
              />
            );
          })}
          {wishlistItems.length === 0 && (
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
        <BasicPagination
          pageCount={pageCount}
          activePage={page}
          handleChangePage={handleChangePage}
        />
      </ResponsiveContainer>
    </>
  );
};

export default Wishlist;
