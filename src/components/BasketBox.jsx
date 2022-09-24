import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Typography, Box } from '@mui/material';

const BasketBox = ({ data: { id, name } }) => {
    return (
        <>
            <Card sx={{ width: 300, minHeight: 400, marginLeft: 3, marginRight: 3, borderRadius: 4, marginBottom: 10, boxShadow: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 1, marginBottom: 2 }}>
                    <Typography sx={{ userSelect: 'none', fontFamily: 'Ubuntu', fontWeight: 700, marginLeft: 2, flexGrow: 1 }}>{id}</Typography>
                    <Typography sx={{ userSelect: 'none', fontFamily: 'Ubuntu', fontWeight: 700, marginRight: 2 }}>{name}</Typography>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 300, height: 350 }}
                    image="https://img.freepik.com/free-photo/wicker-basket-isolated_2829-18051.jpg?w=360"
                    alt="Live from space album cover"
                />
                <Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: 'lightGreen', alignItems: 'center' }}>
                    <Typography sx={{ userSelect: 'none', fontFamily: 'Ubuntu', fontWeight: 700, marginLeft: 2, flexGrow: 1, marginBottom: 1, marginTop: 1 }}>Public/Private</Typography>
                    <Button sx={{ fontFamily: 'Ubuntu', fontWeight: 700, marginRight: 2, marginBottom: 1, marginTop: 1 }}>More detail</Button>
                </Box>
            </Card>
        </>
    )
}

BasketBox.propTypes = {
    data: { 
        id: PropTypes.number,
        name: PropTypes.string
    }
}

export default BasketBox