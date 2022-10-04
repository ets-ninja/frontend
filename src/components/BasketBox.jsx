import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
//import CardContent from '@mui/material/CardContent';
import { Typography, Box } from '@mui/material';

const BasketBox = ({
  data: {
    id,
    name,
    ownerId,
    description,
    finalGoal,
    value,
    expirationDate,
    isPublic,
    createdAt,
  },
}) => {
  return (
    <>
      <Card
        sx={{
          width: 300,
          minHeight: 450,
          marginLeft: 3,
          marginRight: 3,
          borderRadius: 4,
          marginBottom: 10,
          boxShadow: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 1,
            marginBottom: 2,
          }}
        >
          <Typography
            sx={{
              userSelect: 'none',
              fontWeight: 700,
              marginLeft: 2,
              flexGrow: 1,
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{ userSelect: 'none', fontWeight: 700, marginRight: 2 }}
          >
            {new Date(Date.parse(expirationDate) - Date.now()).getDate() +
              ' days left'}
          </Typography>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 300, height: 350 }}
          image="https://img.freepik.com/free-photo/wicker-basket-isolated_2829-18051.jpg?w=360"
          alt="Live from space album cover"
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: isPublic ? 'lightGreen' : '#DF6B6B',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              userSelect: 'none',
              fontWeight: 700,
              marginLeft: 2,
              flexGrow: 1,
              marginBottom: 1,
              marginTop: 1,
            }}
          >
            {isPublic ? 'Public' : 'Private'}
          </Typography>
          <Button
            component={Link}
            to={'/basket/' + id}
            sx={{
              fontWeight: 700,
              marginRight: 2,
              marginBottom: 1,
              marginTop: 1,
              color: isPublic ? '#197BCA' : 'white',
            }}
          >
            More detail
          </Button>
        </Box>
      </Card>
    </>
  );
};

BasketBox.propTypes = {
  data: {
    id: PropTypes.number,
    name: PropTypes.string,
  },
};

export default BasketBox;
