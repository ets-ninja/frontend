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
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SaveIcon from '@mui/icons-material/Save';
import useModal from '../../hooks/useModal';
import CircularProgress from '@mui/material/CircularProgress';

const JarDescription = () => {
  const dispatch = useDispatch();
  const { basketID } = useParams(); 
  const modal = useModal();
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
  let errors = null;

  const { loading, error, success } = useSelector(state => state.basket);

  const [editDescState, setEditDescState] = useState(false);
  const [editedDesc, setEditedDesc] = useState(null);

  const handleEditedDescChange = (event) => {
    setEditedDesc(event.target.value);
  };

  useEffect(() => {
    setEditedDesc(description);
  }, [description])

  const handleModalPhoto = () => {
    modal.open('update-photo', {
      width: 250,
      height: 250,
      aspect: 1,
      canvasBorderRadius: 50,
      basketId: basketID,
      path: 'updateJarImage'})
  }

  const handleOnBlur = () => {
    if(editedDesc?.length <= 1000)
    { 
      setEditDescState(!editDescState); 
      dispatch(update_jar({ id: basketID, description: editedDesc })) 
    }
  }

  return (
      <Card
        fontSize="large"
        sx={{
          width: { xs: '100%', sm: '100%', md: 'auto' },
          borderRadius: 4,
          boxShadow: 4,
          maxWidth: 1000,
          mt: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ p: 2, maxWidth: { xs: '100%', sm: '100%', md: 500 }, minWidth: 350, position: 'relative' }} noValidate autoComplete="off">
          <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
            <IconButton
              sx={{ height: 32, width: 32, mr: 1, mt: -0.3, display: editDescState === false ? 'inline-flex' : 'none' }}
            >
              <EditIcon sx={{ fontSize: 25 }} onClick={() => { setEditDescState(!editDescState) }} />
            </IconButton>
            <IconButton
              sx={{ height: 32, width: 32, mr: 1, mt: -0.3, display: editDescState === true ? 'inline-flex' : 'none' }}
            >
              <SaveIcon sx={{ fontSize: 25 }} onClick={handleOnBlur} />
            </IconButton>
            <Typography variant="h3">Description</Typography>
          </Box>
          <Typography variant="body1" sx={{ width: { xs: '100%', sm: '100%', md: 450 }, textAlign: 'justify', display: editDescState === false ? 'inline-flex' : 'none', whiteSpace: 'pre-wrap' }}>{description}</Typography>
          <TextField
              id="outlined-description"
              multiline
              error={editedDesc?.length > 1000}
              helperText="Description should be below 1000 letters"
              label="Description"
              variant="filled"
              value={editedDesc}
              onChange={handleEditedDescChange}
              onBlur={handleOnBlur}
              sx={{ width: { xs: '100%', sm: '100%', md: 450 }, display: editDescState === true ? 'inline-flex' : 'none' }}
              inputProps={{ min: 0, width: '100%', style: { textAlign: 'justify', fontSize: 14 } }}
              fullWidth
            />
        </Box>

        <Box sx={{ position: 'relative', maxWidth: { xs: '100%', sm: '100%', md: 500 }, heigth: 'auto' }}>
            <Box
              component="img" 
              src={image || "https://img.freepik.com/free-photo/wicker-basket-isolated_2829-18051.jpg?w=360"} 
              sx={{ 
                  minWidth: 200, 
                  minHeight: 200, 
                  maxWidth: { xs: '100%', sm: '100%', md: 500 },
                  objectFit: 'contain',
                  backgroundColor: 'red',
                  borderRadius: { xs: '0', sm: '0', md: '0px 23px 0px 23px' },
                  backgroundColor: 'white' 
              }}>

            </Box>
            {!loading && <IconButton sx={{ position: 'absolute', right: 14, top: 14, height: 40, width: 40, backgroundColor: 'white' }}>
              <CameraAltIcon sx={{ fontSize: 28 }} onClick={handleModalPhoto} />
            </IconButton> }
            {loading && <CircularProgress thickness='5' sx={{ position: 'absolute', right: 14, top: 14, height: 32, width: 32 }} />}
        </Box>
      </Card>
  )
}

export default JarDescription;