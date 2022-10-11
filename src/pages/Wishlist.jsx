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
import ResponsiveContainer from '../components/styled/ResponsiveContainer';
import StyledDropDownMenu from '../components/styled/StyledDropDownMenu';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';

import WishlistCard from '../components/WishlistCard';
import BasicPagination from '../components/BasicPagination';

import { getSortedWishlistItems } from '../redux/wishlist/wishlistActions';
import {
  setSortedWishlistItems,
  setWishlistPage,
  setItemToRemove,
} from '../redux/wishlist/wishlistSlice';

import request from '../hooks/useRequest';

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

  const { load, sendRequest } = request();

  const {
    loading,
    items: wishlistItems,
    totalItems,
    sorting,
    pageCount: pages,
    activePage,
    itemToRemove,
  } = useSelector(state => state.wishlist);

  const dispatch = useDispatch();

  useEffect(() => {
    setSortField(sorting.field);
    setSortOrder(sorting.order);
    setPage(activePage);
    setPageCount(pages);

    dispatch(setItemToRemove(null));
  }, [activePage, pages]);

  const handleOpenSortMenu = e => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseSortMenu = () => {
    setAnchorElNav(null);
  };

  const sortItems = () => {
    dispatch(
      getSortedWishlistItems({
        options: { page, field: sortField, order: sortOrder },
      }),
    );
  };

  useEffect(() => {
    if (sortField) {
      sortItems();
      dispatch(
        setSortedWishlistItems({
          field: sortField,
          order: sortOrder,
        }),
      );
    }
  }, [dispatch, sortField, sortOrder, page]);

  const handleChangePage = page => {
    setPage(page);
    dispatch(setWishlistPage(page));
  };

  const removeItem = async () => {
    try {
      const data = await sendRequest(
        `api/wishlist/delete/${itemToRemove}`,
        'DELETE',
      );
      if (data) {
        if (wishlistItems.length === 1 && pageCount !== 1) {
          handleChangePage(page - 1);
          setPageCount(pageCount - 1);
        }
        sortItems();
      }
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    if (itemToRemove) {
      removeItem();
    }
  }, [itemToRemove]);

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
                  onClick={() => console.log('create')}
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
              Total: {totalItems} items
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
