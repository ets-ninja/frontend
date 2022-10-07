import React from 'react';
import ResponsiveContainer from '../components/styled/ResponsiveContainer';
import { Box, Typography, IconButton, CardMedia } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const WishlistItem = () => {
  return (
    <>
      <ResponsiveContainer sx={{ py: 4 }}>
        <Box
          sx={{
            display: { xs: 'flex', sm: 'auto' },
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 0, sm: 4 },
          }}
        >
          <CardMedia
            component="img"
            sx={{
              height: 300,
              width: { xs: '100%', sm: '50%', lg: '45%' },
            }}
            image={
              'https://caracallacosmetici.com/wp-content/uploads/2019/03/no-img-placeholder.png'
            }
            alt={`photo`}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: { xs: '100%', sm: '50%', lg: '55%' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                mb: 3,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: 24, sm: 20, md: 30 },
                  flexGrow: 1,
                  mb: { xs: 2, sm: 0 },
                  color: theme => theme.colors.dark,
                }}
              >
                Name of the itemName of the itemName of the itemName of the item
              </Typography>
              <IconButton
                title="Edit"
                sx={{
                  height: 30,
                  width: 30,
                  ml: 2,
                  p: 0,
                  '&:hover': { color: theme => theme.palette.primary },
                }}
              >
                <EditIcon
                  sx={{
                    fontSize: 20,
                    color: 'inherit',
                  }}
                />
              </IconButton>
            </Box>
            <Box
              sx={{
                mb: 3,
                borderBottom: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  fontWeight: 700,
                  color: theme => theme.colors.darkBlue,
                }}
              >
                Final goal: 110000
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ color: theme => theme.colors.dark }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi maiores quaerat quae ab, totam asperiores commodi aut
                cumque nostrum veniam.Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Excepturi maiores quaerat quae ab, totam
                asperiores commodi aut cumque nostrum veniam.Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Excepturi maiores quaerat
                quae ab, totam asperiores commodi aut cumque nostrum veniam.
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: 'right',
                fontStyle: 'italic',
              }}
            >
              <Typography
                sx={{ fontSize: '1rem', color: theme => theme.colors.dark }}
              >
                Created on 05/10/2022
              </Typography>
            </Box>
          </Box>
        </Box>
      </ResponsiveContainer>
    </>
  );
};

export default WishlistItem;
