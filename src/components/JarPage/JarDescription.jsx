import { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { update_jar } from '../../redux/basket/basketActions';
import { useParams } from 'react-router-dom';
import { textAlign } from '@mui/system';

const JarDescription = () => {
  const dispatch = useDispatch();
  const { basketID } = useParams(); 
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

  const [editDescState, setEditDescState] = useState(false);
  const [editedDesc, setEditedDesc] = useState(null);

  const handleEditedDescChange = (event) => {
    setEditedDesc(event.target.value);
  };

  useEffect(() => {
    setEditedDesc(description);
  }, [description])

  return (
      <Card
        fontSize="large"
        sx={{
          width: 'auto',
          borderRadius: 4,
          boxShadow: 4,
          mt: 2,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ m: 2, maxWidth: 500, minWidth: 350, position: 'relative' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
            <IconButton
              sx={{ height: 32, width: 32, mr: 1, mt: -0.3 }}
            >
              <EditIcon sx={{ fontSize: 25 }} onClick={() => { setEditDescState(!editDescState) }} />
            </IconButton>
            <Typography variant="h3">Description</Typography>
          </Box>
          <Typography variant="body1" sx={{ textAlign: 'justify', opacity: editDescState === false ? 1 : 0, whiteSpace: 'pre-wrap' }}>{description}</Typography>
          <TextField
              id="outlined-description"
              multiline
              label="Description"
              variant="filled"
              value={editedDesc}
              onChange={handleEditedDescChange}
              onBlur={() => { setEditDescState(!editDescState); dispatch(update_jar({ id: basketID, description: editedDesc }));} }
              sx={{ position: 'absolute', left: 0, top: 36, display: editDescState === true ? 'inline-flex' : 'none' }}
              inputProps={{ min: 0, style: { textAlign: 'justify', fontSize: 14 } }}
              fullWidth
            />
        </Box>

        <Box 
          component="img" 
          src={image || "https://img.freepik.com/free-photo/wicker-basket-isolated_2829-18051.jpg?w=360"} 
          sx={{ 
              minWidth: 200, 
              minHeight: 200, 
              width: 'auto',
              heigth: 'auto',
              objectFit: 'contain',
              backgroundColor: 'red',
              borderRadius: '0px 23px 23px 0px',
              backgroundColor: 'white' 
          }}> 
    </Box>
      </Card>
  )
}

export default JarDescription;