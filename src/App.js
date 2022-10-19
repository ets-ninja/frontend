import { useEffect } from 'react';
import * as Sentry from '@sentry/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToken, onMessageListener } from './firebase';

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
import UpdatePhotoModal from './modal/UpdatePhotoModal/UpdatePhotoModal';
import ConfirmEmail from './pages/Register/ConfirmEmail';

const App = () => {
  const location = useLocation();

  const { isLoggedIn } = useSelector(state => state.auth);
  const { notificationToken } = useSelector(state => state.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && !notificationToken) {
      fetchToken();
    }
  }, [dispatch, isLoggedIn, notificationToken]);

  useEffect(() => {
    if (notificationToken) {
      onMessageListener();
    }
  }, [notificationToken]);

  return (
    <div className="App">
      <Routes location={location.state?.backgroundLocation || location}>
        <Route path="/" element={<Dashboard />} />
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
          element={<StripeStatusContainer />}
          path="/payment-status"
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
          <Route path="/modal/intro-page" element={<IntroSwiper />} />
            <Route path="/modal/public-jar/:id" element={<PublicJarModal />} />
            <Route path="/modal/update-photo" element={<UpdatePhotoModal />} />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default Sentry.withProfiler(App);
