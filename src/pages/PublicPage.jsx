import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JarCard from '../components/JarCard';
import useModal from '../hooks/useModal';
import {
  getPublicData,
  getPublicUsers,
  getPublicPagination,
} from '../redux/public/publicSelectors';
import {
  fetchFilteredJars,
  fetchPublicJars,
  fetchUserJars,
} from '../redux/public/publicActions';
import { Avatar, Pagination, TextField, Typography } from '@mui/material';
import Slider from '../components/SliderItemsPerPage';
import { useDebounceEffect } from '../hooks/useDebounceEffect';
import { useForm, useWatch } from 'react-hook-form';
import publicSlice from '../redux/public/publicSlice';

const ResponsiveContainer = styled('div')`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;
  @media (min-width: 600px) {
    width: 570px;
  }
  @media (min-width: 768px) {
    width: 720px;
  }
  @media (min-width: 900px) {
    width: 870px;
  }
  @media (min-width: 1200px) {
    width: 1170px;
  }
  @media (min-width: 1536px) {
    width: 1400px;
  }
  @media (max-width: 599px) {
    width: 100%;
  }
`;

export default function PublicPage() {
  const modal = useModal();
  const dispatch = useDispatch();
  const { register, control, reset } = useForm();
  const filterQuery = useWatch({
    control,
    name: 'filterQuery',
  });
  const [isUserJars, setIsUserJars] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [jarsPerPage, setJarsPerPage] = useState(9);
  const { pageCount } = useSelector(getPublicPagination);
  const jars = useSelector(getPublicData);
  const users = useSelector(getPublicUsers);

  useEffect(() => {
    if (!isFilter && !isUserJars)
      dispatch(fetchPublicJars({ page, jarsPerPage }));
    if (!isFilter && isUserJars) {
      const userToFind = users[0]._id;
      dispatch(fetchUserJars({ userToFind, page, jarsPerPage }));
    }
  }, [dispatch, isFilter, isUserJars, jarsPerPage, page, users]);

  useDebounceEffect(
    () => {
      if (filterQuery && !isFilter) setIsFilter(true);
      if (!filterQuery) {
        setIsFilter(false);
        return;
      }
      if (isUserJars) setIsUserJars(false);
      dispatch(fetchFilteredJars({ filterQuery, page, jarsPerPage }));
    },
    250,
    [filterQuery, page],
  );

  const handleUserClick = user => {
    if (users?.length === 1 && users[0]?._id === user._id) {
      return;
    }
    const userToFind = user._id;
    setIsUserJars(true);
    reset({ filterQuery: null });
    dispatch(publicSlice.actions.setUsers(user));
    dispatch(fetchUserJars({ userToFind, page, jarsPerPage }));
  };

  function handleOpenModal(e, data) {
    if (
      e.target.getAttribute('data-clickable') ||
      e.target.parentElement.getAttribute('data-clickable')
    )
      return;
    modal.open('public-jar/10', data);
  }

  return (
    <ResponsiveContainer>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={e => e.preventDefault()}
      >
        <TextField
          {...register('filterQuery')}
          id="standard-basic"
          label="Search"
          variant="outlined"
          sx={{ mb: 2, width: '100% ' }}
        />
      </Box>
      {users && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
          {users.map(el => (
            <Box
              key={el._id}
              onClick={() => handleUserClick(el)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                background: '#ebebeb',
                borderRadius: '9999em',
                p: '2px',
                pr: 2,
                mr: 1,
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              <Avatar
                alt={el.publicName || 'Rick Astley'}
                src={
                  el.userPhoto ||
                  'https://americansongwriter.com/wp-content/uploads/2022/03/RickAstley.jpeg?fit=2000%2C800'
                }
                sx={{ width: 56, height: 56 }}
              />
              <Typography variant="h3" component="p" sx={{ ml: 2 }}>
                {el.publicName || 'Rick Astley'}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
      {!!jars?.length && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            mb: { smd: '-15px', md: '-20px', xl: '-30px' },
          }}
        >
          {jars.map((jar, i) => (
            <JarCard
              key={jar._id + i}
              bank={jar}
              handleOpenModal={handleOpenModal}
              handleUserClick={handleUserClick}
            />
          ))}
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 3,
        }}
      >
        {pageCount > 1 && (
          <Pagination
            count={pageCount}
            page={page}
            showFirstButton={pageCount > 5}
            showLastButton={pageCount > 5}
            onChange={(_, value) => {
              setPage(value);
            }}
          />
        )}
        <Slider setJarsPerPage={setJarsPerPage} />
      </Box>
    </ResponsiveContainer>
  );
}
