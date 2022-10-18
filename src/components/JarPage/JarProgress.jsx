import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 40,
    borderRadius: 20,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 20,
      background:
        'linear-gradient(270.27deg, #58D68D 1.94%, rgba(88, 214, 141, 0.51) 99.95%);',
    },
  }));

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
        image 
    } = useSelector(state => state.basket.basket);

    return (
        <Box sx={{ width: '92%', position: 'relative' }}>
            <BorderLinearProgress
            variant="determinate"
            value={Math.max(0, Math.min(100, value * 100 / goal))}
            sx={{
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
            }}>
            {value}$
            </Typography>
            <Typography
            variant="h5"
            component="p"
            sx={{
                position: 'absolute',
                top: '50%',
                left: '105%',
                transform: 'translate(-50%, -50%)',
            }}>
            {goal}$
            </Typography>
        </Box>
    )
}

export default JarProgress;