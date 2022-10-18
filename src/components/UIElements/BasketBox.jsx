import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const getDaysBetweenDates = (date1, date2) => {
  const differenceInTime = date1 - date2;
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
}

const BasketBox = ({
  data: {
    _id,
    name,
    ownerId,
    description,
    finalGoal,
    value,
    expirationDate,
    isPublic,
    createdAt,
    image
  },
}) => {
  const theme = useTheme();

  const sliceDesc = desc => {
    if (desc?.length > 420) {
      return `${desc.slice(0, 420)}...`;
    } else {
      return desc;
    }
  };

  return (
    <>
      <Card
        sx={{
          width: 300,
          minHeight: 450,
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
          {(getDaysBetweenDates(new Date(expirationDate), Date.now()) <= 0) && <Typography  sx={{ userSelect: 'none', fontWeight: 700, marginRight: 2 }}>Expired</Typography>}
          {(getDaysBetweenDates(new Date(expirationDate), Date.now()) > 0) && <Typography  sx={{ userSelect: 'none', fontWeight: 700, marginRight: 2 }}>{getDaysBetweenDates(new Date(expirationDate), Date.now()) + ' days left'}</Typography>}
        </Box>
        <Box sx={{ width: 300, height: 350, position: 'relative' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 300, height: 350, position: 'absolute', zIndex: 0  }}
                        src={image || "https://img.freepik.com/free-photo/wicker-basket-isolated_2829-18051.jpg?w=360"} 
                        alt={`${name} photo`}
                    />
                    <Box sx={{ opacity: 0, '&:hover': { opacity: 1 }, zIndex: 1, transition: '0.5s', backgroundColor: theme.colors.yellow, width: 300, height: 350, position: 'absolute', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
                        <Typography align="center">
                            {sliceDesc(description)}
                        </Typography>
                    </Box>
                </Box>
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
            to={'/basket/' + _id}
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
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

export default BasketBox;
