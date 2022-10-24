import { LinearProgress, linearProgressClasses, styled } from '@mui/material';

const SumLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 40,
  borderRadius: 20,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 20,
    background:
      'linear-gradient(90deg, rgba(255,199,110,1) 0%, rgba(255,156,0,1) 100%);',
  },
}));

export default SumLinearProgress;
