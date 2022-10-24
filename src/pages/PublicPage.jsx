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

import { Box } from '@mui/system';
import { Collapse, Pagination } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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
  SettingsBar,
} from '../components/publicPage';
import {
  getModalData,
  getModalId,
  getModalIsLoading,
  getModalIsOpen,
} from '../redux/modal/modalSelectors';

export default function PublicPage() {
  const modal = useModal();
  const dispatch = useDispatch();
  const { register, control, reset } = useForm();
  const filterQuery = useWatch({
    control,
    name: 'filterQuery',
  });

  const { pageCount } = useSelector(getPublicPagination);
  const modalData = useSelector(getModalData);
  const modalIsLoading = useSelector(getModalIsLoading);
  const modalIsOpen = useSelector(getModalIsOpen);
  const modalId = useSelector(getModalId);
  const jars = useSelector(getPublicData);
  const users = useSelector(getPublicUsers);
  const status = useSelector(getPublicStatus);

  const [isUserJars, setIsUserJars] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [jarsPerPage, setJarsPerPage] = useState(9);
  const [sortOrder, setSortOrder] = useState('date desc');

  useEffect(() => {
    if (!modalData && modalIsLoading && !modalIsOpen) {
      modal.open('public-jar/' + modalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalData]);

  useEffect(() => {
    if (!isFilter && !isUserJars) {
      dispatch(fetchPublicJars({ page, sortOrder, jarsPerPage }));
    }
  }, [dispatch, isFilter, isUserJars, jarsPerPage, page, sortOrder]);

  useEffect(() => {
    if (!isFilter && isUserJars) {
      dispatch(
        fetchUserJars({
          userToFind: users[0]._id,
          page,
          sortOrder,
          jarsPerPage,
        }),
      );
    }
  }, [
    dispatch,
    isFilter,
    isUserJars,
    jarsPerPage,
    page,
    sortOrder,
    users,
    basket,
  ]);

  useDebounceEffect(
    () => {
      if (filterQuery && !isFilter) setIsFilter(true);
      if (!filterQuery) {
        setIsFilter(false);
        return;
      }
      if (isUserJars) setIsUserJars(false);
      dispatch(
        fetchFilteredJars({ filterQuery, page, sortOrder, jarsPerPage }),
      );
    },
    500,
    [filterQuery, page, jarsPerPage],
  );

  const handleUserClick = user => {
    if (users?.length === 1 && users[0]?._id === user._id) {
      return;
    }
    setIsUserJars(true);
    reset({ filterQuery: null });
    dispatch(publicSlice.actions.setUsers(user));
  };

  const handleBackClick = () => {
    setIsUserJars(false);
    setIsFilter(false);
    reset({ filterQuery: null });
  };

  function handleOpenModal(e, data) {
    if (
      e.target.getAttribute('data-clickable') ||
      e.target.parentElement.getAttribute('data-clickable')
    )
      return;

    modal.open('public-jar/' + data._id, data);
  }

  return (
    <ResponsiveContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Collapse orientation="horizontal" in={isFilter || isUserJars}>
          <ArrowBackIosNewIcon
            onClick={handleBackClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 1,
              p: '4px',
              background: '#ebebeb',
              borderRadius: '10%',
              height: '40px',
              width: '40px',
              fill: 'rgba(0,0,0,0.67)',
              scale: '1',
              transition: theme => theme.icon.hover.transition,
              '&:hover': theme => theme.icon.hover,
            }}
          />
        </Collapse>

        <FilterForm register={register} />
        <SettingsBar setSortOrder={setSortOrder} setPage={setPage} />
      </Box>
      {users && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
          {users.map(el => (
            <UserCard
              key={el._id}
              user={el}
              handleUserClick={handleUserClick}
            />
          ))}
        </Box>
      )}
      {status.isLoading && <CardSkeleton quantity={jarsPerPage} />}
      {!status.isLoading && !!jars?.length && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            mb: { smd: '-15px', md: '-20px', xl: '-30px' },
          }}
        >
          {jars.map((jar, idx) => (
            <JarCard
              key={jar._id}
              idx={idx}
              jar={jar}
              handleOpenModal={handleOpenModal}
              handleUserClick={handleUserClick}
              isMyJar={false}
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
