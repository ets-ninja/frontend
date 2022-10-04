import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Typography, Box } from '@mui/material';

const WishlistCard = ({
  itemInfo: { id, name, image, finalGoal, createdAt },
}) => {
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
    if (name.length > 35) {
      return `${name.slice(0, 33)}...`;
    } else {
      return name;
    }
  };

  return (
    <>
      <Card
        sx={{
          width: { lg: '23%', md: '30%', sm: '45%', xs: '100%' },
          minHeight: 300,
          borderRadius: 4,
          boxShadow: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 1,
            mb: 2,
          }}
        >
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 700,
              ml: 2,
              pr: 1,
              height: 40,
              flexGrow: 1,
              lineHeight: 1.2,
            }}
          >
            {sliceName(name)}
          </Typography>
          <Typography
            sx={{ userSelect: 'none', fontWeight: 700, marginRight: 2 }}
          >
            {formatteDate(new Date(createdAt))}
          </Typography>
        </Box>
        <CardMedia
          component="img"
          sx={{
            height: 200,
          }}
          image={
            image ||
            'https://caracallacosmetici.com/wp-content/uploads/2019/03/no-img-placeholder.png'
          }
          alt={`${name} photo`}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'lightGreen',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              marginLeft: 2,
              flexGrow: 1,
              marginBottom: 1,
              marginTop: 1,
              fontSize: { xs: '1rem', sm: '0.8rem', lg: '1rem' },
            }}
          >
            {'Goal: ' + finalGoal + '₴'}
          </Typography>
          <Button
            component={Link}
            to={'/wishlist/' + id}
            sx={{
              fontWeight: 700,
              marginRight: 2,
              marginBottom: 1,
              marginTop: 1,
              color: '#197BCA',
            }}
          >
            More detail
          </Button>
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
