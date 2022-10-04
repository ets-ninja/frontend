import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import BasketBox from '../components/BasketBox';

import StyledDropDownMenu from '../components/styled/StyledDropDownMenu';

const Dashboard = () => {
  const [hiddenFilterAnchor, sethiddenFilterAnchor] = React.useState(null);
  const hiddenFilterMenuOpen = Boolean(hiddenFilterAnchor);

  const handleFilterClick = event => {
    sethiddenFilterAnchor(event.currentTarget);
  };
  const handleFilterClose = () => {
    sethiddenFilterAnchor(null);
  };

  const [createByMeState, setCreateByMeState] = React.useState(true);
  const [coownedByMeState, setCoownedByMeState] = React.useState(false);
  const [hotBasketsState, sethotBasketsState] = React.useState(false);
  const [publicBasketsState, setPublicBasketsState] = React.useState(false);
  const [privateBasketsState, setPrivateBasketsState] = React.useState(false);

  const testData = [
    {
      id: 0,
      name: 'Basket A',
      ownerId: 321312,
      description: 'I am a good basket',
      finalGoal: 400,
      value: 200,
      expirationDate: '2022-09-30',
      isPublic: false,
      createdAt: '2022-09-20',
    },
    {
      id: 1,
      name: 'Basket B',
      ownerId: 12312,
      description: 'I am a bad basket',
      finalGoal: 2000,
      value: 100,
      expirationDate: '2022-10-11',
      isPublic: false,
      createdAt: '2022-09-25',
    },
    {
      id: 2,
      name: 'Basket C',
      ownerId: 12312,
      description: 'I am a bad basket',
      finalGoal: 2000,
      value: 100,
      expirationDate: '2022-10-11',
      isPublic: true,
      createdAt: '2022-09-25',
    },
  ];

  const getBaskets = () => {
    let baskets = [];

    testData.forEach((basket, index) => {
      if (createByMeState === true && basket.ownerId === 12312) {
        baskets.push(basket);
        return;
      }
      if (coownedByMeState === true && basket.ownerId !== 12312) {
        baskets.push(basket);
        return;
      }
      if (
        hotBasketsState === true &&
        new Date(Date.parse(basket.expirationDate) - Date.now()).getDate() < 7
      ) {
        baskets.push(basket);
        return;
      }
      if (publicBasketsState === true && basket.isPublic === true) {
        baskets.push(basket);
        return;
      }
      if (privateBasketsState === true && basket.isPublic === false) {
        baskets.push(basket);
        return;
      }
    });

    return baskets;
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 0 }}>
          <Toolbar
            sx={{ bgcolor: 'white', p: 2, minWidth: 300, color: 'black' }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'Ubuntu',
                fontWeight: 700,
                fontSize: 46,
                flexGrow: 1,
              }}
            >
              Dashboard
            </Typography>
            <Button
              variant="contained"
              color="inherit"
              sx={{ mr: 1 }}
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleFilterClick}
            >
              Filter
            </Button>
            <StyledDropDownMenu
              id="hidden-filter-menu"
              MenuListProps={{
                'aria-labelledby': 'hidden-filter-button',
              }}
              anchorEl={hiddenFilterAnchor}
              open={hiddenFilterMenuOpen}
              onClose={handleFilterClose}
            >
              <FormGroup sx={{ marginLeft: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={createByMeState}
                      onChange={() => {
                        setCreateByMeState(!createByMeState);
                      }}
                    />
                  }
                  label="Created by me"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={coownedByMeState}
                      onChange={() => {
                        setCoownedByMeState(!coownedByMeState);
                      }}
                    />
                  }
                  label="Co-owned by me"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={hotBasketsState}
                      onChange={() => {
                        sethotBasketsState(!hotBasketsState);
                      }}
                    />
                  }
                  label="Hot baskets"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={publicBasketsState}
                      onChange={() => {
                        setPublicBasketsState(!publicBasketsState);
                      }}
                    />
                  }
                  label="Public baskets"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={privateBasketsState}
                      onChange={() => {
                        setPrivateBasketsState(!privateBasketsState);
                      }}
                    />
                  }
                  label="Private baskets"
                />
              </FormGroup>
            </StyledDropDownMenu>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#58D68D',
                color: 'black',
                '&:hover': { backgroundColor: '#358255', color: 'white' },
              }}
            >
              Create new
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          bgcolor: 'white',
          boxShadow: 1,
          borderRadius: 3,
          p: 2,
          minWidth: 300,
          color: 'black',
          marginLeft: 5,
          marginRight: 5,
          borderColor: 'black',
        }}
      >
        {getBaskets().map(basket => {
          return <BasketBox data={basket} />;
        })}
        {getBaskets().length === 0 && (
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Ubuntu',
              fontWeight: 500,
              fontSize: 30,
              flexGrow: 1,
            }}
          >
            {' '}
            No baskets available!{' '}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default Dashboard;
