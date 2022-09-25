import React from 'react'
import {
  Avatar,
  Button,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material'

import style from './Profile.module.css'

const Profile = () => {
  return (
    <div className={style.profile}>
      <div>
        <Card>
          <Grid container alignItems='center'>
            <Grid
              container
              item
              direction='column'
              gap={'15px'}
              xs={12}
              md={3}
              sx={{ p: '2rem' }}
              justifyContent='center'
            >
              <Avatar
                className={style.userImg}
                sx={{ width: '150px', height: '150px', m: '0 auto' }}
              />

              <Button sx={{ m: '10px' }} variant='contained'>
                Change photo
              </Button>
            </Grid>
            <Divider
              className={style.divider}
              orientation='vertical'
              flexItem
            />
            <Grid container item xs={12} md={6} sx={{ p: '2rem' }}>
              <List sx={{ width: '100%' }}>
                <ListItem>
                  <Typography variant='h6'>Email: Test</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h6'>First name: Test</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h6'>Last name: Test</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h6'>Public name: Test</Typography>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Card>
      </div>

      <div>
        <Card sx={{ p: '1rem' }}>
          <div className={style.changeUserInfo}>
            <Divider>Public Information</Divider>
            <div>
              <Typography className={style.infoText} variant='h5'>First name & Last name</Typography>
              <div className={style.firstAndLastName}>
                <div className={style.input}>
                  <TextField
                    id='outlined-basic'
                    label='First name'
                    variant='outlined'
                  />
                  <Button size='medium' variant='contained'>
                    Save
                  </Button>
                </div>
                <div className={style.input}>
                  <TextField
                    id='outlined-basic'
                    label='First name'
                    variant='outlined'
                  />
                  <Button variant='contained'>Save</Button>
                </div>
              </div>
              <div className={style.publicName}>
                <Typography className={style.infoText} variant='h5'>Public name</Typography>
                <div className={style.input}>
                  <TextField
                    id='outlined-basic'
                    label='First name'
                    variant='outlined'
                  />
                  <Button variant='contained'>Save</Button>
                </div>
              </div>
            </div>
            <Divider sx={{ p: '10px' }}>Security</Divider>
            <div className={style.security}>
              <Typography className={style.infoText} variant='h5'>Change your password</Typography>
              <div className={style.securityInput}>
                <TextField
                  id='outlined-basic'
                  label='First name'
                  variant='outlined'
                />
                <TextField
                  id='outlined-basic'
                  label='First name'
                  variant='outlined'
                />
                <Button variant='contained'>Save</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Profile
