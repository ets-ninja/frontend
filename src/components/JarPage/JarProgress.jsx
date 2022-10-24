import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import SumLinearProgress from '../SumLinearProgress';

const JarProgress = () => {
  const {
    name,
    ownerId: { firstName },
    description,
    goal,
    value,
    expirationDate,
    isPublic,
    createdAt,
    image,
  } = useSelector(state => state.basket.basket);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', pr: 6 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ position: 'relative', width: '100%', mr: 1 }}>
          <SumLinearProgress
            variant="determinate"
            value={Math.max(0, Math.min(100, (value * 100) / goal))}
            sx={{
              width: '100%',
              height: '45px',
            }}
          />
          <Typography
            variant="h5"
            component="p"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {value}$
          </Typography>
        </Box>
      </Box>
      <Box sx={{ minWidth: 35, ml: 1 }}>
        <Typography variant="h5" component="p">
          {goal}$
        </Typography>
      </Box>
    </Box>
  );
};

export default JarProgress;
