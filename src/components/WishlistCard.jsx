import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Typography, Box } from '@mui/material';

import useModal from '@hooks/useModal';

const WishlistCard = ({
  itemInfo: { _id, name, image, finalGoal, createdAt },
}) => {
  const modal = useModal();

  const formatteDate = date => {
    const formatte = date => {
      return date < 10 ? '0' + date : date;
    };

    const year = date.getFullYear().toString().slice(2);
    const month = formatte(date.getMonth() + 1);
    const day = formatte(date.getDate());

    return `${day}.${month}.${year}`;
  };

  const sliceName = name => {
    if (name.length > 55) {
      return `${name.slice(0, 53)}...`;
    } else {
      return name;
    }
  };

  const handleRemove = () => {
    modal.open('confirm-delete-wishlist-item', {
      deleteWishlistItemId: _id,
    });
  };

  return (
    <>
      <Card
        sx={{
          width: {
            lg: 'calc(25% + 1px);',
            md: 'calc(33.3333% + 1px)',
            sm: 'calc(50% + 1px)',
            xs: '100%',
          },
          maxWidth: { xs: 350, sm: '100%' },
          minHeight: 240,
          borderRadius: 0,
          boxShadow: 0,
          boxSizing: 'border-box',
          border: 1,
          borderColor: 'rgba(0, 0, 0, 0.3)',
          mt: '-1px',
          ml: '-1px',
          p: { md: 3, xs: 2 },
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: 133,
          }}
          image={
            image ||
            'https://caracallacosmetici.com/wp-content/uploads/2019/03/no-img-placeholder.png'
          }
          alt={`${name} photo`}
        />
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            height: 40,
            flexGrow: 1,
            lineHeight: 1.2,
            my: 1.5,
            color: theme => theme.colors.dark,
          }}
        >
          {sliceName(name)}
        </Typography>
        <Typography
          sx={{
            flexGrow: 1,
            fontSize: '1rem',
          }}
        >
          {'Goal: ' + '$' + finalGoal}
        </Typography>
        <Button
          component={Link}
          variant="contained"
          fullWidth={true}
          to={'/wishlist/' + _id}
          sx={{
            backgroundColor: theme => theme.palette.primary,
            color: theme => theme.colors.white,
            letterSpacing: 1,
            py: 1.5,
            mt: 1,
            '&:hover': { boxShadow: 5 },
          }}
        >
          More details
        </Button>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            onClick={handleRemove}
            sx={{
              color: theme => theme.colors.dark,
              textDecoration: 'underline',
              textTransform: 'none',
              py: 1.5,
              '&:hover': {
                color: theme => theme.palette.danger.main,
                textDecoration: 'underline',
                background: 'transparent',
              },
            }}
          >
            Remove
          </Button>
          <Typography
            sx={{
              fontSize: '0.8rem',
              textAlign: 'right',
              fontStyle: 'italic',
              color: theme => theme.colors.dark,
            }}
          >
            Created: {formatteDate(new Date(createdAt))}
          </Typography>
        </Box>
      </Card>
    </>
  );
};

WishlistCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  image: PropTypes.string,
  finalGoal: PropTypes.number,
  createdAt: PropTypes.string,
};

export default WishlistCard;
