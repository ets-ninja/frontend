import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import useModal from '../../hooks/useModal'
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { update_jar } from '../../redux/basket/basketActions';
import { useParams } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';

const JarInfoHeader = () => {
    const { basketID } = useParams(); 
    const modal = useModal();
    const dispatch = useDispatch();
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

    const [editNameState, setEditNameState] = useState(false);
    const [editedName, setEditedName] = useState(name);

    const handleEditedNameChange = (event) => {
      setEditedName(event.target.value);
    };

    useEffect(() => {
        setEditedName(name);
    }, [name])

    const sliceName = name => {
        if (name?.length > 12) {
          return `${name.slice(0, 10)}...`;
        } else {
          return name;
        }
      };

    const handleOnBlur = () => {
      if(editedName?.length <= 40) {
        setEditNameState(!editNameState); 
        dispatch(update_jar({ id: basketID, name: editedName }));
      }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <IconButton sx={{ height: 35, width: 35, mt: 0.6, mr: 0.5 }} component={Link} to="/">
              <ChevronLeftIcon fontSize="large" />
            </IconButton>
            <Typography
                variant="h1"
                sx={{ fontFamily: 'Ubuntu', fontWeight: 700, fontSize: 40, display: editNameState === false ? 'inline' : 'none', }}>
                {sliceName(name)}
            </Typography>
            <TextField
                sx={{ display: editNameState === true ? 'inline' : 'none', flexGrow: 1, heigth: 32 }}
                id="outlined-name"
                error={editedName?.length > 40}
                helperText="Name should be below 40 letters"
                label="Name"
                value={editedName}
                onChange={handleEditedNameChange}
                onBlur={handleOnBlur}
              />
            <IconButton sx={{ display: editNameState === false ? 'inline' : 'none', height: 45, width: 45, ml: 0.5 }} onClick={() => { setEditNameState(!editNameState) }}>
              <EditIcon sx={{ fontSize: 32 }} />
            </IconButton>
            <IconButton sx={{ display: editNameState === true ? 'inline' : 'none', height: 45, width: 45, ml: 0.5 }} onClick={handleOnBlur}>
              <SaveIcon sx={{ fontSize: 32 }} />
            </IconButton>
        </Box>
    )
}

export default JarInfoHeader;