import { useEffect, useState } from 'react';
import * as Sentry from '@sentry/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchToken, onMessageListener } from './firebase';
import {
  addMultipleNotification,
  addNotification,
} from '@redux/notifications/notificationSlice';
import removeSeenNofitication from '@utils/notification/removeSeenNotification';
import loadBackgroundMessages from '@utils/notification/loadBackgroundMessages';
import notificationChannel from '@utils/notification/notificationChannel';

import './App.scss';

import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import LostPassword from './pages/LostPassword';
import MyJars from './pages/MyJars';
import Wishlist from './pages/Wishlist';
import SavingsSchemes from './pages/SavingsSchemes';
import Settings from './pages/Settings';
import CreationPage from './pages/CreationPage';
import Dashboard from './pages/Dashboard';
import Basket from './pages/Basket';
import ModalWindow from './modal';
import PublicJarModal from './modal/PublicJarModal';
import RestorePassword from './pages/RestorePassword';
import PublicPage from './pages/PublicPage';
import StripeStatusContainer from './pages/StripeStatusContainer';
import MoneyStatusContainer from './pages/MoneyStatusContainer';
import UpdatePhotoModal from './modal/UpdatePhotoModal/UpdatePhotoModal';
import ConfirmEmail from './pages/Register/ConfirmEmail';
import IntroChecker from './components/IntroChecker/IntroChecker';
import IntroSwiper from './pages/IntoPage/IntroSwiper';

const App = () => {
  const location = useLocation();

  const { isLoggedIn } = useSelector(state => state.auth);
  const { notificationToken, isFCMSupported } = useSelector(
    state => state.notification,
  );

  const [isMessageListenerOn, setIsMessageListenerOn] = useState(false);
  const [isMessageLoaded, setIsMessageLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && isFCMSupported && !notificationToken) {
      fetchToken();
    }

    if (notificationToken && !isMessageListenerOn) {
      onMessageListener();
      setIsMessageListenerOn(true);
    }

    const channel = notificationChannel.getInstance();

    const handleBackgroudMessage = event => {
      dispatch(addNotification(event.data));
      removeSeenNofitication();
    };

    if (isLoggedIn && isFCMSupported && notificationToken && !isMessageLoaded) {
      const firstLoadMessages = async () => {
        let messages;

        try {
          messages = await loadBackgroundMessages();
        } catch (error) {
          Sentry.captureException(error);
        }

        if (messages) {
          console.log('Hello');
          dispatch(addMultipleNotification(messages));
        }
        setIsMessageLoaded(true);
      };
      firstLoadMessages();

      channel.addEventListener('message', handleBackgroudMessage);

      return () => {
        channel.removeEventListener('message', handleBackgroudMessage);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    isFCMSupported,
    isLoggedIn,
    isMessageListenerOn,
    notificationToken,
  ]);

  return (
    <div className="App">
      <Routes location={location.state?.backgroundLocation || location}>
        <Route path="/" element={<IntroChecker />} />
        <Route path="/basket/:basketID" element={<Basket />} />
        <Route exect element={<Login />} path="/login" />
        <Route exect element={<Register />} path="/register" />
        <Route exect element={<ConfirmEmail />} path="/confirm-email" />
        <Route exect element={<LostPassword />} path="/lost-password" />
        <Route exect element={<RestorePassword />} path="/restorepassword" />
        <Route
          exect
          element={<ProtectedRoute component={CreationPage} />}
          path="/creation"
        />
        <Route
          exect
          element={<ProtectedRoute component={Dashboard} />}
          path="/dashboard"
        />
        <Route
          exect
          element={<StripeStatusContainer />}
          path="/payment-status"
        />
        <Route
          exect
          element={<MoneyStatusContainer type={'donate'} />}
          path="/donate-status"
        />
        <Route
          exect
          element={<MoneyStatusContainer type={'receive'} />}
          path="/receive-status"
        />
        <Route
          exect
          element={<ProtectedRoute component={Profile} />}
          path="/profile"
        />
        <Route
          exect
          element={<ProtectedRoute component={MyJars} />}
          path="/myjars"
        />
        <Route
          exect
          element={<ProtectedRoute component={Wishlist} />}
          path="/wishlist"
        />
        <Route
          exect
          element={<ProtectedRoute component={SavingsSchemes} />}
          path="/savingsschemes"
        />
        <Route
          exect
          element={<ProtectedRoute component={Settings} />}
          path="/settings"
        />
        <Route
          exect
          element={<ProtectedRoute component={PublicPage} />}
          path="/public"
        />
      </Routes>
      {location.state?.backgroundLocation && (
        <Routes>
          <Route path="modal" element={<ModalWindow />}>
            <Route path="/modal/public-jar/:id" element={<PublicJarModal />} />
            <Route path="/modal/update-photo" element={<UpdatePhotoModal />} />
            <Route path="/modal/intro-page" element={<IntroSwiper />} />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default Sentry.withProfiler(App);
