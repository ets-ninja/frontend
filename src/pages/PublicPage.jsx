import { useState } from 'react';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPublicData,
  getPublicUsers,
  getPublicPagination,
  getPublicStatus,
} from '../redux/public/publicSelectors';
import {
  fetchFilteredJars,
  fetchPublicJars,
  fetchUserJars,
} from '../redux/public/publicActions';

import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { Pagination } from '@mui/material';

import useModal from '../hooks/useModal';
import { useDebounceEffect } from '../hooks/useDebounceEffect';
import ResponsiveContainer from '../components/styled/ResponsiveContainer';
import JarCard from '../components/JarCard';
import publicSlice from '../redux/public/publicSlice';
import {
  FilterForm,
  SliderItmesPerPage,
  UserCard,
  CardSkeleton,
} from '../components/publicPage';

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
  const status = useSelector(getPublicStatus);

  useEffect(() => {
    if (!isFilter && !isUserJars)
      dispatch(fetchPublicJars({ page, jarsPerPage }));
    if (!isFilter && isUserJars) {
      dispatch(fetchUserJars({ userToFind: users[0]._id, page, jarsPerPage }));
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
    [filterQuery, page, jarsPerPage],
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
      <FilterForm register={register} />
      {status.isLoading && <CardSkeleton quantity={jarsPerPage} />}
      {users && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
          {users.map(el => (
            <UserCard user={el} handleUserClick={handleUserClick} />
          ))}
        </Box>
      )}
      {!status.isLoading && !!jars?.length && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            mb: { smd: '-15px', md: '-20px', xl: '-30px' },
          }}
        >
          {jars.map(jar => (
            <JarCard
              key={jar._id}
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
        <SliderItmesPerPage
          jarsPerPage={jarsPerPage}
          setJarsPerPage={setJarsPerPage}
        />
      </Box>
    </ResponsiveContainer>
  );
}
