import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';

export default function CardSkeleton({ quantity }) {
  return (
    <Box
      sx={{
        display: { smd: 'flex' },
        flexWrap: 'wrap',
      }}
    >
      {new Array(quantity).fill('').map((el, i) => (
        <Box
          key={i}
          sx={{
            boxSizing: 'border-box',
            border: '1px solid #86868666',
            borderRadius: '5px',
            flexBasis: {
              xs: '100%',
              smd: 'calc((100% - 15px) / 2)',
              md: 'calc((100% - 20px) / 2)',
              lg: 'calc((100% - 40px) / 3)',
              xl: 'calc((100% - 60px) / 3)',
            },
            '&:not(:last-of-type)': {
              mb: { xs: '15px', smd: '15px', md: '20px', xl: '30px' },
            },
            '&:nth-of-type(odd)': {
              mr: { md: '20px', smd: '15px', lg: '0' },
            },
            '&:not(:nth-of-type(3n))': {
              mr: { lg: '20px', xl: '30px' },
            },
            mb: { smd: '15px', md: '20px', xl: '30px' },
          }}
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={470}
            width={'100%'}
          />
        </Box>
      ))}
    </Box>
  );
}
