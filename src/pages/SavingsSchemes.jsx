import { Box, CardMedia, Typography } from '@mui/material';
import React from 'react';

const SavingsSchemes = () => {

  const Schemes = [{
    id: 1,
    image: 'https://kniga.biz.ua/images/author/1556_1118191243.jpg',
    creator: 'By Robert Kiyosaki',
    free: 50,
    saving: 30,
    wishes: 20,
  },{
    id: 2,
    image: 'data:image/jpeg;base64,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',
    creator: 'By Giga Volodymr',
    free: 0,
    saving: 100,
    wishes: 0,
  },{
    id: 3,
    image: 'https://kniga.biz.ua/images/author/1556_1118191243.jpg',
    creator: 'By El Bisnesmanelo',
    free: 30,
    saving: 70,
    wishes: 0,
  },  
  {
    id: 4,
    image: 'https://sticker-collection.com/stickers/plain/NiceBoobies/512/e6ba27ab-572c-4441-bf7a-64b8384e5973file_668613.webp',
    creator: 'By Green Genius',
    free: 10,
    saving: 10,
    wishes: 80,
  },
]

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: '36px',
          fontWeight: 'bold',
          mb: '30px',
        }}
      >
        SavingsSchemes
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: '15px', sm: '40px', md: '40px' },
          flexDirection: { xs: 'column', sm: 'column  ', md: 'column', lg: 'row' },
          maxWidth: '1080px',
        }}
      >
        {Schemes.map((schema)=>(

        <Box
          sx={{
            display: 'flex',
            gap: { xs:'25px', sm: '60px', md:'60px'},
            boxShadow: '0px 2px 10px gray',
            borderRadius: '30px',
            minWidth: { xs:'310px', sm: '500px', md:'500px'},
            maxWidth: { xs:'310px', sm: '400px', md:'500px'},
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            ":hover": { scale:' 1.1 ' }
          }}
        >
          <CardMedia
            sx={{ maxWidth: { xs:'100px', sm: '150px', md:'150px'}, maxHeight: { xs:'100px', sm: '150px', md:'150px'}, borderRadius: '30px' }}
            component="img"
            src={schema.image}
          />
          <Box>
            <Typography
              sx={{
                fontSize: { xs:'16px', sm: '26px', md:'26px'},
                fontWeight: '500',
                mt: '20px'
              }}
            >
              {schema.creator}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection:'row', justifyContent: 'space-around', mt: '10px'}}>
              <Typography sx={{fontSize: '13px', lineHeight: '1'}}>
               <Typography sx={{color: 'green', fontWeight: '600', fontSize: { xs:'17px', sm: '20px', md:'20px'}, lineHeight: '1' }}>{schema.free}%</Typography> Free 
              </Typography>
              <Typography sx={{fontSize: '13px', lineHeight: '1'}}>
                <Typography sx={{color: 'purple', fontWeight: '600', fontSize: { xs:'17px', sm: '20px', md:'20px'}, lineHeight: '1' }}>{schema.saving}%</Typography> Investing
              </Typography>
              <Typography sx={{fontSize: '13px', lineHeight: '1'}}>
                <Typography sx={{color: 'blue', fontWeight: '600', fontSize: { xs:'17px', sm: '20px', md:'20px'}, lineHeight: '1' }}>{schema.wishes}%</Typography> Wishes
              </Typography>
            </Box>
          </Box>
        </Box>))}
      </Box>
    </Box>
  );
};

export default SavingsSchemes;
