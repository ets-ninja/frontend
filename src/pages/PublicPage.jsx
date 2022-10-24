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
import { Pagination } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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
import { get_basket_by_id } from '../redux/jar/basketActions';

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
  const [sortOrder, setSortOrder] = useState('date desc');
  const { pageCount } = useSelector(getPublicPagination);
  const jars = useSelector(getPublicData);
  const users = useSelector(getPublicUsers);
  const status = useSelector(getPublicStatus);
  const { basket } = useSelector(state => state.basket);

  useEffect(() => {
    const redirectToBank = localStorage.getItem('redirectToBank');

    if (redirectToBank) {
      dispatch(get_basket_by_id({ id: redirectToBank }));
    }

    if (redirectToBank && basket._id) {
      modal.open(`public-jar/${redirectToBank}`, {
        user: basket.ownerId,
        createdAt: basket.creationData,
        name: basket.name,
        image: basket.image,
        expirationDate: basket.expirationDate,
        goal: basket.goal,
        value: basket.value,
        description: basket.description,
      });
      localStorage.removeItem('redirectToBank');
    }

    if (!isFilter && !isUserJars)
      dispatch(fetchPublicJars({ page, sortOrder, jarsPerPage }));
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
    dispatch(fetchUserJars({ userToFind, page, sortOrder, jarsPerPage }));
  };

  const handleBackClick = () => {
    setIsUserJars(false);
    reset({ filterQuery: null });
    setIsFilter(false);
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
        {(isFilter || isUserJars) && (
          <ArrowBackIosIcon
            onClick={handleBackClick}
            sx={{
              height: '40px',
              width: '40px',
              fill: 'rgba(0,0,0,0.67)',
              scale: '1',
              transition: theme => theme.icon.hover.transition,
              '&:hover': theme => theme.icon.hover,
            }}
          />
        )}
        <FilterForm register={register} />
        <SettingsBar setSortOrder={setSortOrder} />
      </Box>
      {users && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
          {users.map(el => (
            <UserCard user={el} handleUserClick={handleUserClick} />
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
          {jars.map(jar => (
            <JarCard
              key={jar._id}
              bank={jar}
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
