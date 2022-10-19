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
      'linear-gradient(270.27deg, #FBB13C 1.94%, rgba(251, 177, 60, 51) 99.95%);',
  },
}));

export default SumLinearProgress;
